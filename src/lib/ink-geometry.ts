export type Point = readonly [x: number, y: number];
/** A corner anchor breaks the curve: the outline comes to a point there. */
export type Anchor = Point | readonly [x: number, y: number, corner: "corner"];
export type InkTone = "ink" | "paper";

/** Closed, filled silhouette drawn through its anchors. */
export type InkOutline = {
  readonly kind: "outline";
  readonly id: string;
  readonly tone: InkTone;
  readonly anchors: readonly Anchor[];
};
/** Open pen stroke drawn through its anchors. */
export type InkStroke = {
  readonly kind: "stroke";
  readonly id: string;
  readonly tone: InkTone;
  readonly width: number;
  /** Closed loop without fill, such as a ring. Omitted means an open stroke. */
  readonly closed?: boolean;
  readonly anchors: readonly Anchor[];
};
/** Filled ellipse. `rotation` in degrees. */
export type InkSpot = {
  readonly kind: "spot";
  readonly id: string;
  readonly tone: InkTone;
  readonly center: Point;
  readonly radii: Point;
  readonly rotation: number;
};
export type InkShape = InkOutline | InkStroke | InkSpot;

/** Idle motion of a group. `period` and `delay` in seconds. */
export type InkMotion = {
  readonly kind: "breathe" | "flick" | "blink" | "hop" | "wiggle" | "tilt";
  readonly period: number;
  readonly delay: number;
};
export type InkGroup = {
  readonly kind: "group";
  readonly id: string;
  /** Transform origin of the motion, in drawing units. */
  readonly pivot?: Point;
  readonly motion?: InkMotion;
  readonly children: readonly InkNode[];
};
export type InkNode = InkGroup | InkShape;

export type InkDrawing = {
  readonly id: string;
  readonly width: number;
  readonly height: number;
  /** Largest anchor displacement between boil frames, in drawing units. */
  readonly jitter: number;
  readonly nodes: readonly InkNode[];
};

export type SpotGeometry = {
  readonly center: Point;
  readonly radii: Point;
  readonly rotation: number;
};

export const BOIL_FRAME_COUNT = 4;

const EPSILON = 1e-6;
const SPOT_CENTER_JITTER_SCALE = 0.5;
const SPOT_RADIUS_VARIATION = 0.08;
const SPOT_ROTATION_VARIATION = 6;

// Seeded so server and client renders agree and Next prerender accepts the module.
function seededRandom(seed: string): () => number {
  let hash = 0x811c9dc5;
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  let state = hash >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let mixed = state;
    mixed = Math.imul(mixed ^ (mixed >>> 15), mixed | 1);
    mixed ^= mixed + Math.imul(mixed ^ (mixed >>> 7), mixed | 61);
    return ((mixed ^ (mixed >>> 14)) >>> 0) / 4294967296;
  };
}

function signedUnit(random: () => number): number {
  return random() * 2 - 1;
}

function isCorner(anchor: Anchor): boolean {
  return anchor.length === 3;
}

function jitterAnchors(anchors: readonly Anchor[], seed: string, jitter: number): Anchor[] {
  const random = seededRandom(seed);
  return anchors.map((anchor): Anchor => {
    const x = anchor[0] + signedUnit(random) * jitter;
    const y = anchor[1] + signedUnit(random) * jitter;
    return anchor.length === 3 ? [x, y, "corner"] : [x, y];
  });
}

function roundToTenth(value: number): number {
  return Math.round(value * 10) / 10;
}

function formatPoint(point: Anchor): string {
  return roundToTenth(point[0]) + " " + roundToTenth(point[1]);
}

function distanceRoot(from: Anchor, to: Anchor): number {
  return Math.sqrt(Math.hypot(to[0] - from[0], to[1] - from[1]));
}

function firstControlPoint(p0: Anchor, p1: Anchor, p2: Anchor): Point {
  const l01 = distanceRoot(p0, p1);
  const l12 = distanceRoot(p1, p2);
  if (l01 <= EPSILON || isCorner(p1)) {
    return [p1[0], p1[1]];
  }
  const a = 2 * l01 * l01 + 3 * l01 * l12 + l12 * l12;
  const n = 3 * l01 * (l01 + l12);
  return [
    (p1[0] * a - p0[0] * l12 * l12 + p2[0] * l01 * l01) / n,
    (p1[1] * a - p0[1] * l12 * l12 + p2[1] * l01 * l01) / n,
  ];
}

function secondControlPoint(p1: Anchor, p2: Anchor, p3: Anchor): Point {
  const l12 = distanceRoot(p1, p2);
  const l23 = distanceRoot(p2, p3);
  if (l23 <= EPSILON || isCorner(p2)) {
    return [p2[0], p2[1]];
  }
  const b = 2 * l23 * l23 + 3 * l23 * l12 + l12 * l12;
  const m = 3 * l23 * (l23 + l12);
  return [
    (p2[0] * b + p1[0] * l23 * l23 - p3[0] * l12 * l12) / m,
    (p2[1] * b + p1[1] * l23 * l23 - p3[1] * l12 * l12) / m,
  ];
}

function segmentData(p0: Anchor, p1: Anchor, p2: Anchor, p3: Anchor): string {
  const first = firstControlPoint(p0, p1, p2);
  const second = secondControlPoint(p1, p2, p3);
  return "C " + formatPoint(first) + " " + formatPoint(second) + " " + formatPoint(p2);
}

function closedPathData(anchors: readonly Anchor[]): string {
  const count = anchors.length;
  const segments: string[] = ["M " + formatPoint(anchors[0])];
  for (let index = 0; index < count; index += 1) {
    segments.push(
      segmentData(
        anchors[(index - 1 + count) % count],
        anchors[index],
        anchors[(index + 1) % count],
        anchors[(index + 2) % count],
      ),
    );
  }
  segments.push("Z");
  return segments.join(" ");
}

function openPathData(anchors: readonly Anchor[]): string {
  const last = anchors.length - 1;
  const segments: string[] = ["M " + formatPoint(anchors[0])];
  for (let index = 0; index < last; index += 1) {
    segments.push(
      segmentData(
        anchors[Math.max(index - 1, 0)],
        anchors[index],
        anchors[index + 1],
        anchors[Math.min(index + 2, last)],
      ),
    );
  }
  return segments.join(" ");
}

/** SVG path data of an outline or stroke for one boil frame. Frame 0 is the drawing as authored. */
export function inkPathData(shape: InkOutline | InkStroke, frame: number, jitter: number): string {
  const isClosed = shape.kind === "outline" || shape.closed === true;
  const minimumAnchors = isClosed ? 3 : 2;
  if (shape.anchors.length < minimumAnchors) {
    throw new Error(
      "Ink " + shape.kind + " '" + shape.id + "' needs at least " + minimumAnchors + " anchors",
    );
  }
  const anchors = frame === 0 ? shape.anchors : jitterAnchors(shape.anchors, shape.id + ":" + frame, jitter);
  return isClosed ? closedPathData(anchors) : openPathData(anchors);
}

/** Ellipse of a spot for one boil frame. Frame 0 is the spot as authored. */
export function inkSpotGeometry(spot: InkSpot, frame: number, jitter: number): SpotGeometry {
  if (frame === 0) {
    return { center: spot.center, radii: spot.radii, rotation: spot.rotation };
  }
  const random = seededRandom(spot.id + ":" + frame);
  const centerJitter = jitter * SPOT_CENTER_JITTER_SCALE;
  const center: Point = [
    roundToTenth(spot.center[0] + signedUnit(random) * centerJitter),
    roundToTenth(spot.center[1] + signedUnit(random) * centerJitter),
  ];
  const radii: Point = [
    roundToTenth(spot.radii[0] * (1 + signedUnit(random) * SPOT_RADIUS_VARIATION)),
    roundToTenth(spot.radii[1] * (1 + signedUnit(random) * SPOT_RADIUS_VARIATION)),
  ];
  const rotation = roundToTenth(spot.rotation + signedUnit(random) * SPOT_ROTATION_VARIATION);
  return { center, radii, rotation };
}
