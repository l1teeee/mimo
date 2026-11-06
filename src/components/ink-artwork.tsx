import {
  BOIL_FRAME_COUNT,
  inkPathData,
  inkSpotGeometry,
  type InkDrawing,
  type InkGroup,
  type InkNode,
  type InkOutline,
  type InkSpot,
  type InkStroke,
} from "@/lib/ink-geometry";

type FrameProps = { frame: number; jitter: number };

function InkPath({ shape, frame, jitter }: FrameProps & { shape: InkOutline | InkStroke }) {
  const d = inkPathData(shape, frame, jitter);
  if (shape.kind === "stroke") {
    return <path data-ink={`${shape.kind} ${shape.tone}`} d={d} strokeWidth={shape.width} />;
  }
  return <path data-ink={`${shape.kind} ${shape.tone}`} d={d} />;
}

function InkSpotShape({ shape, frame, jitter }: FrameProps & { shape: InkSpot }) {
  const { center, radii, rotation } = inkSpotGeometry(shape, frame, jitter);
  return (
    <g transform={`translate(${center[0]} ${center[1]}) rotate(${rotation})`}>
      <ellipse data-ink={`spot ${shape.tone}`} rx={radii[0]} ry={radii[1]} />
    </g>
  );
}

function InkGroupShape({ group, frame, jitter }: FrameProps & { group: InkGroup }) {
  const { motion, pivot } = group;
  if (!motion) {
    return (
      <g data-ink-group={group.id}>
        <InkNodes nodes={group.children} frame={frame} jitter={jitter} />
      </g>
    );
  }
  if (!pivot) {
    throw new Error(`Ink group '${group.id}' has a motion but no pivot`);
  }
  return (
    <g
      data-ink-group={group.id}
      data-ink-motion={motion.kind}
      style={{
        transformOrigin: `${pivot[0]}px ${pivot[1]}px`,
        animationDuration: `${motion.period}s`,
        animationDelay: `${motion.delay}s`,
      }}
    >
      <InkNodes nodes={group.children} frame={frame} jitter={jitter} />
    </g>
  );
}

function InkNodes({ nodes, frame, jitter }: FrameProps & { nodes: readonly InkNode[] }) {
  return nodes.map((node) => {
    switch (node.kind) {
      case "group":
        return <InkGroupShape key={node.id} group={node} frame={frame} jitter={jitter} />;
      case "spot":
        return <InkSpotShape key={node.id} shape={node} frame={frame} jitter={jitter} />;
      default:
        return <InkPath key={node.id} shape={node} frame={frame} jitter={jitter} />;
    }
  });
}

export function InkArtwork({
  drawing,
  label,
  className,
}: {
  drawing: InkDrawing;
  label: string;
  className?: string;
}) {
  const frames = Array.from({ length: BOIL_FRAME_COUNT }, (_, frame) => frame);
  return (
    <svg
      data-ink-art={drawing.id}
      viewBox={`0 0 ${drawing.width} ${drawing.height}`}
      role="img"
      aria-label={label}
      className={className}
    >
      {frames.map((frame) => (
        <g key={frame} data-boil-frame={frame}>
          <InkNodes nodes={drawing.nodes} frame={frame} jitter={drawing.jitter} />
        </g>
      ))}
    </svg>
  );
}
