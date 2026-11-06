"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(useGSAP, DrawSVGPlugin);

const ALIVE_CLASS = "is-alive";
const PEN_UNITS_PER_SECOND = 420;
const MIN_STROKE_SECONDS = 0.25;
const MAX_STROKE_SECONDS = 1.1;

function penStrokeSeconds(stroke: SVGPathElement): number {
  const seconds = stroke.getTotalLength() / PEN_UNITS_PER_SECOND;
  return Math.min(MAX_STROKE_SECONDS, Math.max(MIN_STROKE_SECONDS, seconds));
}

function createArtworkTimeline(artwork: SVGSVGElement): gsap.core.Timeline {
  const firstFrame = artwork.querySelector('[data-boil-frame="0"]');
  if (!firstFrame) {
    throw new Error(`Ink artwork '${artwork.dataset.inkArt}' has no boil frame 0`);
  }
  const penStrokes = firstFrame.querySelectorAll<SVGPathElement>('[data-ink="stroke ink"]');
  const outlines = firstFrame.querySelectorAll('[data-ink^="outline"]');
  const carvedLines = firstFrame.querySelectorAll('[data-ink="stroke paper"]');
  const spots = firstFrame.querySelectorAll('[data-ink^="spot"]');

  const timeline = gsap.timeline();

  penStrokes.forEach((stroke) => {
    timeline.from(stroke, {
      drawSVG: 0,
      duration: penStrokeSeconds(stroke),
      ease: "power1.inOut",
    });
  });

  if (outlines.length > 0) {
    timeline.from(
      outlines,
      { drawSVG: 0, duration: 0.8, ease: "power2.inOut", stagger: 0.06 },
      ">-0.3",
    );
    timeline.from(
      outlines,
      { fillOpacity: 0, duration: 0.45, ease: "power1.out", stagger: 0.06 },
      "<0.45",
    );
  }

  if (carvedLines.length > 0) {
    timeline.from(
      carvedLines,
      { drawSVG: 0, duration: 0.45, ease: "power1.inOut", stagger: 0.06 },
      ">-0.2",
    );
  }

  if (spots.length > 0) {
    timeline.from(
      spots,
      {
        scale: 0,
        transformOrigin: "50% 50%",
        duration: 0.35,
        ease: "back.out(2)",
        stagger: { amount: 0.6 },
      },
      "<0.1",
    );
  }

  return timeline;
}

function createIntroTimeline(root: HTMLElement, onComplete: () => void): gsap.core.Timeline {
  const artworks = root.querySelectorAll<SVGSVGElement>("[data-ink-art]");
  const intro = gsap.timeline({ delay: 0.15, onComplete });
  intro.set(artworks, { autoAlpha: 1 });
  artworks.forEach((artwork, index) => {
    intro.add(createArtworkTimeline(artwork), index === 0 ? 0 : ">-0.6");
  });
  return intro;
}

export function InkStage({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        createIntroTimeline(root, () => root.classList.add(ALIVE_CLASS));
        return () => root.classList.remove(ALIVE_CLASS);
      });

      return () => media.revert();
    },
    { scope: rootRef },
  );

  return <div ref={rootRef}>{children}</div>;
}
