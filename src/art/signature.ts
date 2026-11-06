import type { InkDrawing } from "@/lib/ink-geometry";

export const signature: InkDrawing = {
  id: "signature",
  width: 240,
  height: 100,
  jitter: 0.8,
  nodes: [
    {
      kind: "stroke",
      id: "m-1",
      tone: "ink",
      width: 3.4,
      anchors: [
        [32, 74], [32, 62.5], [32, 51], [35.8, 41.8], [45, 38], [54.2, 41.8], [58, 51], [58, 62.5], [58, 74, "corner"],
        [58, 62.5], [58, 51], [61.8, 41.8], [71, 38], [80.2, 41.8], [84, 51], [84, 62.5], [84, 74],
      ],
    },
    {
      kind: "stroke",
      id: "i",
      tone: "ink",
      width: 3.4,
      anchors: [[102, 38], [102, 56], [102, 74]],
    },
    { kind: "spot", id: "i-dot", tone: "ink", center: [102, 24], radii: [2.2, 2.2], rotation: 0 },
    {
      kind: "stroke",
      id: "m-2",
      tone: "ink",
      width: 3.4,
      anchors: [
        [118, 74], [118, 62.5], [118, 51], [121.8, 41.8], [131, 38], [140.2, 41.8], [144, 51], [144, 62.5],
        [144, 74, "corner"], [144, 62.5], [144, 51], [147.8, 41.8], [157, 38], [166.2, 41.8], [170, 51], [170, 62.5],
        [170, 74],
      ],
    },
    {
      kind: "stroke",
      id: "o",
      tone: "ink",
      width: 3.4,
      closed: true,
      anchors: [
        [200, 38], [207, 40.4], [212.1, 47], [214, 56], [212.1, 65], [207, 71.6], [200, 74], [193, 71.6],
        [187.9, 65], [186, 56], [187.9, 47], [193, 40.4],
      ],
    },
  ],
};
