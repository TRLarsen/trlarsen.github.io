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
      // Look for the link with data-footnote-ref
      const link = target.closest("a[data-footnote-ref]") as HTMLAnchorElement;
      
      if (!link) return;
      
      const footnoteId = link.hash.substring(1); // e.g. "user-content-fn-1"
      // remark-gfm adds "user-content-" prefix to IDs during some processing steps
      const footnoteEl = document.getElementById(footnoteId);
      
      if (!footnoteEl) return;

      // Extract content, removing the backlink
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

  const startCloseTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setTooltip(null);
    }, 300); // Slightly longer window to reach the box
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
      {/* Arrow */}
      <div className="absolute -top-1.5 left-[15%] w-3 h-3 bg-zinc-800 border-l border-t border-zinc-700 rotate-45" />
    </div>,
    document.body
  );
}