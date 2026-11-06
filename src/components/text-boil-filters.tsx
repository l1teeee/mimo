const BOIL_SEEDS = [3, 11, 23, 42];

export function TextBoilFilters() {
  return (
    <svg aria-hidden="true" width="0" height="0" className="absolute">
      <defs>
        {BOIL_SEEDS.map((seed, frame) => (
          <filter key={seed} id={"text-boil-" + frame} colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed={seed} result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.4" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        ))}
      </defs>
    </svg>
  );
}
