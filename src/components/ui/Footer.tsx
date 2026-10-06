import { profile, socials } from "@/content/site";

// Recruiters often scroll straight to the bottom, so keep the profile links here too.
// Centered so the links never sit under the fixed "Ask my AI" launcher (bottom-right).
const footerLinks = socials.filter((s) => ["GitHub", "LinkedIn"].includes(s.name));

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-primary/40 px-6 py-8 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 text-center">
        <p className="text-[14px] text-secondary">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <ul className="flex items-center gap-6">
          {footerLinks.map((s) => (
            <li key={s.name}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] font-medium text-secondary transition-colors hover:text-white"
              >
                {s.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
