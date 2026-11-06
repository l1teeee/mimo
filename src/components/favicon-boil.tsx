"use client";

import { useEffect } from "react";

const FRAME_INTERVAL_MS = 340;
const ICON_SIZE = 64;
// Each frame flips the icon like the paper layers of the page.
const FRAME_SCALES: readonly (readonly [scaleX: number, scaleY: number])[] = [
  [1, 1],
  [-1, 1],
  [-1, -1],
  [1, -1],
];

function drawFrames(icon: HTMLImageElement): string[] {
  const canvas = document.createElement("canvas");
  canvas.width = ICON_SIZE;
  canvas.height = ICON_SIZE;
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas 2D context is not available to draw the favicon frames");
  }
  return FRAME_SCALES.map(([scaleX, scaleY]) => {
    context.setTransform(scaleX, 0, 0, scaleY, scaleX < 0 ? ICON_SIZE : 0, scaleY < 0 ? ICON_SIZE : 0);
    context.drawImage(icon, 0, 0, ICON_SIZE, ICON_SIZE);
    return canvas.toDataURL("image/png");
  });
}

export function FaviconBoil() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    // A browser or extension may have removed it; the static icon is enough then.
    if (!link) return;

    const originalHref = link.href;
    const icon = new Image();
    let intervalId: number | undefined;

    icon.onload = () => {
      const frames = drawFrames(icon);
      let frameIndex = 0;
      intervalId = window.setInterval(() => {
        frameIndex = (frameIndex + 1) % frames.length;
        link.href = frames[frameIndex];
      }, FRAME_INTERVAL_MS);
    };
    icon.src = originalHref;

    return () => {
      window.clearInterval(intervalId);
      icon.onload = null;
      link.href = originalHref;
    };
  }, []);

  return null;
}
