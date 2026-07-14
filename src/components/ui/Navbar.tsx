"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { navLinks, profile } from "@/content/site";
import { styles } from "@/lib/styles";
import { useResumeModal } from "@/components/ui/ResumeModal";

export default function Navbar() {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { open: openResume } = useResumeModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`${styles.paddingX} fixed top-0 z-20 flex w-full items-center py-5 transition-colors duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-black-100/50 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <Link
          href="#hero"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <span className="cursor-pointer text-[18px] font-bold text-white">
            {profile.name}
            <span className="hidden text-secondary sm:inline">
              {" "}
              | Portfolio
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden list-none flex-row gap-8 lg:flex">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title ? "text-white" : "text-secondary"
              } cursor-pointer text-[16px] font-medium transition-colors hover:text-white`}
              onClick={() => setActive(link.title)}
            >
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
          <li>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                openResume();
              }}
              className="rounded-lg bg-[#915EFF] px-4 py-2 text-[15px] font-medium text-white transition-colors hover:bg-[#7c47ff]"
            >
              Resume
            </a>
          </li>
        </ul>

        {/* Mobile menu */}
        <div className="flex flex-1 items-center justify-end lg:hidden">
          <button
            aria-label="Toggle menu"
            onClick={() => setToggle((t) => !t)}
            className="relative h-7 w-7"
          >
            <Image
              src={toggle ? "/icons/close.svg" : "/icons/menu.svg"}
              alt="menu"
              fill
              className="object-contain"
            />
          </button>

          <div
            className={`${
              toggle ? "flex" : "hidden"
            } absolute right-0 top-16 z-10 mx-4 my-2 min-w-[160px] rounded-xl border border-white/10 bg-black-100/80 p-6 backdrop-blur-xl`}
          >
            <ul className="flex flex-1 list-none flex-col items-start justify-end gap-4">
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`${
                    active === link.title ? "text-white" : "text-secondary"
                  } cursor-pointer text-[16px] font-medium`}
                  onClick={() => {
                    setToggle(false);
                    setActive(link.title);
                  }}
                >
                  <a href={`#${link.id}`}>{link.title}</a>
                </li>
              ))}
              <li>
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    setToggle(false);
                    openResume();
                  }}
                  className="text-[16px] font-medium text-white"
                >
                  Resume
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
