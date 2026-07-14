import { profile } from "@/content/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-primary/40 px-6 py-8 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-[14px] text-secondary">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
