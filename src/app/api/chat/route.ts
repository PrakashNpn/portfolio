import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt } from "@/lib/assistant";

// The Anthropic SDK needs the Node.js runtime (not Edge).
export const runtime = "nodejs";

const MODEL = "claude-haiku-4-5"; // cheapest tier; the user opted into Haiku
const MAX_TOKENS = 1024;
const MAX_MESSAGES = 12; // cap history sent to the model
const MAX_CHARS = 1500; // cap per-message length

// Best-effort in-memory rate limit. Serverless instances don't share memory,
// so this is a soft guard against a single abusive client, not a hard quota.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 15;
const hits = new Map<string, { count: number; reset: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now > rec.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  rec.count += 1;
  return rec.count > MAX_PER_WINDOW;
}

type ClientMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  // Graceful fallback: works the moment ANTHROPIC_API_KEY is set in .env.local.
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      {
        error: "not_configured",
        message:
          "The AI assistant isn't switched on yet. Add ANTHROPIC_API_KEY to .env.local to enable it. In the meantime, feel free to use the contact form.",
      },
      { status: 503 }
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "local";
  if (isRateLimited(ip)) {
    return Response.json(
      {
        error: "rate_limited",
        message: "That's a lot of questions! Please wait a moment and try again.",
      },
      { status: 429 }
    );
  }

  let body: { messages?: ClientMessage[] };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  const messages = (Array.isArray(body.messages) ? body.messages : [])
    .filter(
      (m) =>
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return Response.json(
      { error: "bad_request", message: "Expected a user message." },
      { status: 400 }
    );
  }

  const client = new Anthropic();
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const modelStream = client.messages.stream({
          model: MODEL,
          max_tokens: MAX_TOKENS,
          system: buildSystemPrompt(),
          messages,
        });
        for await (const event of modelStream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } catch (err) {
        console.error("Assistant stream error:", err);
        controller.enqueue(
          encoder.encode(
            "\n\nSorry, something went wrong on my end. Please try again."
          )
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
