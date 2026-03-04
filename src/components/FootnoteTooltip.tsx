"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";

export default function FootnoteTooltip() {
  const [tooltip, setTooltip] = useState<{
    content: string;
    x: number;
    y: number;
    id: string;
    label: string;
  } | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a[data-footnote-ref]") as HTMLAnchorElement;
      
      if (!link) return;
      
      const footnoteId = link.hash.substring(1);
      const footnoteEl = document.getElementById(footnoteId);
      
      if (!footnoteEl) return;

      const clone = footnoteEl.cloneNode(true) as HTMLElement;
      const backlink = clone.querySelector(".footnote-backref");
      if (backlink) backlink.remove();
      
      const content = clone.innerHTML.trim();
      const label = link.textContent || "";
      const rect = link.getBoundingClientRect();
      
      if (timerRef.current) clearTimeout(timerRef.current);
      
      setTooltip({
        content,
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY,
        id: footnoteId,
        label
      });
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a[data-footnote-ref]")) {
        startCloseTimer();
      }
    };

    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);
    
    return () => {
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const footnotes = document.querySelector(".footnotes") as HTMLElement;
    if (!footnotes) return;

    const handleScroll = () => {
      const rect = footnotes.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // We start the fade when the footnotes section is at 95% of the viewport (just appearing)
      // We reach 100% opacity when the top of the section is at 50% of the viewport height.
      const start = viewportHeight * 0.95; 
      const end = viewportHeight * 0.5;   
      
      let opacity = 0.3;
      if (rect.top < start) {
        // Calculate the ratio of how far we are from the start to the end
        const progress = (start - rect.top) / (start - end);
        // Map 0-1 to 0.3-1.0
        opacity = 0.3 + (Math.min(Math.max(progress, 0), 1) * 0.7);
      }
      
      footnotes.style.setProperty("--footnote-opacity", opacity.toString());
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const startCloseTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setTooltip(null);
    }, 300);
  };

  const cancelCloseTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  if (!tooltip) return null;

  return createPortal(
    <div
      onMouseEnter={cancelCloseTimer}
      onMouseLeave={startCloseTimer}
      style={{
        position: "absolute",
        left: `${tooltip.x}px`,
        top: `${tooltip.y + 24}px`,
        transform: "translateX(-15%)",
      }}
      className="z-[100] w-80 p-5 bg-zinc-800 border border-zinc-700 rounded shadow-2xl animate-in fade-in zoom-in-95 duration-200"
    >
      <div className="flex gap-3">
        <span className="text-xs font-bold text-zinc-500 mt-0.5 shrink-0">{tooltip.label}</span>
        <div 
          className="prose-footnote text-[13px] leading-relaxed text-zinc-200"
          dangerouslySetInnerHTML={{ __html: tooltip.content }} 
        />
      </div>
      <div className="absolute -top-1.5 left-[15%] w-3 h-3 bg-zinc-800 border-l border-t border-zinc-700 rotate-45" />
    </div>,
    document.body
  );
}