import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

// Run the real route with an isolated rate limiter and a fake Anthropic client.
// No credentials, network requests, or paid model calls are used by these tests.
const routePath = fileURLToPath(new URL("../src/app/api/chat/route.ts", import.meta.url));
const routeCode = ts.transpileModule(readFileSync(routePath, "utf8"), {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2017,
    esModuleInterop: true,
  },
}).outputText;

function createRoute() {
  const calls = [];
  let clientsCreated = 0;
  class FakeAnthropic {
    constructor() {
      clientsCreated += 1;
    }
    messages = {
      async *stream(options) {
        calls.push(options);
        yield { type: "message_start" };
        for (const text of ["Hello", " from the assistant."]) {
          yield {
            type: "content_block_delta",
            delta: { type: "text_delta", text },
          };
        }
      },
    };
  }
  const exports = {};
  vm.runInNewContext(routeCode, {
    exports,
    require(name) {
      if (name === "@anthropic-ai/sdk") {
        return { __esModule: true, default: FakeAnthropic };
      }
      if (name === "@/lib/assistant") {
        return { buildSystemPrompt: () => "Portfolio context" };
      }
      throw new Error(`Unexpected dependency: ${name}`);
    },
    process: { env: { ANTHROPIC_API_KEY: "test-placeholder" } },
    Response,
    ReadableStream,
    TextEncoder,
    console,
  });
  return { POST: exports.POST, calls, clientsCreated: () => clientsCreated };
}

function request(body) {
  return new Request("http://localhost/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
}

const invalidPayloads = [
  ["invalid JSON", "{"],
  ["null body", "null"],
  ["string body", '"hello"'],
  ["number body", "42"],
  ["boolean body", "true"],
  ["array body", "[]"],
  ["missing messages", "{}"],
  ["null messages", '{"messages":null}'],
  ["non-array messages", '{"messages":"hello"}'],
  ["empty conversation", '{"messages":[]}'],
  ["null message", '{"messages":[null]}'],
  ["primitive message", '{"messages":[42]}'],
  ["missing role", '{"messages":[{"content":"hello"}]}'],
  ["invalid role", '{"messages":[{"role":"system","content":"hello"}]}'],
  ["missing content", '{"messages":[{"role":"user"}]}'],
  ["non-string content", '{"messages":[{"role":"user","content":123}]}'],
  ["empty content", '{"messages":[{"role":"user","content":""}]}'],
  ["whitespace content", '{"messages":[{"role":"user","content":"   "}]}'],
  ["last message is assistant", '{"messages":[{"role":"assistant","content":"hello"}]}'],
  ["invalid message mixed with valid input", '{"messages":[null,{"role":"user","content":"hello"}]}'],
];

for (const [name, body] of invalidPayloads) {
  test(`returns 400 for ${name} without calling Anthropic`, async () => {
    const route = createRoute();
    const response = await route.POST(request(body));
    assert.equal(response.status, 400);
    assert.equal((await response.json()).error, "bad_request");
    assert.equal(route.clientsCreated(), 0);
  });
}

test("valid conversations still stream text and strip extra message fields", async () => {
  const route = createRoute();
  const messages = [
    { role: "user", content: "What do you build?" },
    { role: "assistant", content: "AI applications." },
    { role: "user", content: "Tell me more.", ignored: "extra field" },
  ];
  const response = await route.POST(request(JSON.stringify({ messages })));
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("Content-Type"), "text/plain; charset=utf-8");
  assert.equal(await response.text(), "Hello from the assistant.");
  assert.deepEqual(JSON.parse(JSON.stringify(route.calls[0].messages)),
    messages.map(({ role, content }) => ({ role, content })));
});

test("valid messages retain the history and character limits", async () => {
  const route = createRoute();
  const messages = Array.from({ length: 15 }, (_, i) => ({
    role: i % 2 === 0 ? "user" : "assistant",
    content: `${i}: ${"x".repeat(1600)}`,
  }));
  const response = await route.POST(request(JSON.stringify({ messages })));
  assert.equal(response.status, 200);
  await response.text();
  const sent = route.calls[0].messages;
  assert.equal(sent.length, 12);
  assert.equal(sent[0].content, messages[3].content.slice(0, 1500));
  assert(sent.every((message) => message.content.length === 1500));
});
