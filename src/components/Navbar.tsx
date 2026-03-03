"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      scrolled 
        ? "bg-background/80 backdrop-blur-md border-b border-border py-4" 
        : "bg-transparent py-8"
    )}>
      <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="font-semibold text-foreground tracking-tight hover:text-accent transition-colors">
          Tyler R. Larsen
        </Link>
        <div className="flex gap-8 text-sm font-medium">
          <Link href="/research" className="text-foreground/70 hover:text-foreground transition-colors">Research</Link>
          <Link href="/writing" className="text-foreground/70 hover:text-foreground transition-colors">Writing</Link>
          <Link href="/cv" className="text-foreground/70 hover:text-foreground transition-colors">CV</Link>
        </div>
      </div>
    </nav>
  );
}