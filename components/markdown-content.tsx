"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Check, Copy } from "lucide-react";
import "react-photo-view/dist/react-photo-view.css";

interface MarkdownContentProps {
  htmlContent: string;
}

export function MarkdownContent({ htmlContent }: MarkdownContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const imgElements = containerRef.current.querySelectorAll("img");
    const extractedImages: string[] = [];
    imgElements.forEach((img, idx) => {
      extractedImages.push(img.src);
      img.dataset.photoIndex = String(idx);
      img.style.cursor = "zoom-in";
    });
    setImages(extractedImages);

    const preElements = containerRef.current.querySelectorAll("pre");
    preElements.forEach((pre) => {
      if (pre.querySelector(".copy-button-wrapper")) return;

      const codeElement = pre.querySelector("code");
      if (!codeElement) return;

      const code = codeElement.textContent || "";
      const wrapper = document.createElement("div");
      wrapper.className = "copy-button-wrapper";

      const button = document.createElement("button");
      button.className = "copy-button";
      button.setAttribute("aria-label", "Copy code to clipboard");
      button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;

      button.onclick = async () => {
        await navigator.clipboard.writeText(code);
        button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`;
        setTimeout(() => {
          button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
        }, 2000);
      };

      wrapper.appendChild(button);
      pre.appendChild(wrapper);
    });
  }, [htmlContent]);

  const handleImageClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "IMG") {
      const idx = parseInt(target.dataset.photoIndex || "0", 10);
      const trigger = document.querySelector(
        `[data-photo-trigger="${idx}"]`,
      ) as HTMLElement;
      trigger?.click();
    }
  }, []);

  return (
    <PhotoProvider>
      <div
        ref={containerRef}
        className="markdown-content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        onClick={handleImageClick}
      />
      {images.map((src, idx) => (
        <PhotoView key={idx} src={src}>
          <span data-photo-trigger={idx} className="hidden" />
        </PhotoView>
      ))}
    </PhotoProvider>
  );
}
