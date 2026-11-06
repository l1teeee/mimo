import { emblem } from "@/art/emblem";
import { signature } from "@/art/signature";
import { InkArtwork } from "@/components/ink-artwork";
import { InkStage } from "@/components/ink-stage";
import { TextBoilFilters } from "@/components/text-boil-filters";

export default function Home() {
  return (
    <InkStage>
      <TextBoilFilters />
      <main className="mx-auto grid min-h-svh w-full max-w-[32rem] grid-rows-[auto_minmax(2.5rem,1.9fr)_auto_minmax(2.5rem,3fr)_auto_minmax(2rem,1fr)_auto] justify-items-center px-6 pt-[clamp(2.5rem,7.5svh,4.5rem)] pb-[clamp(2rem,5svh,3rem)] text-center">
        <p data-reveal="label" className="row-start-1 text-[clamp(1.125rem,1rem_+_0.5vmin,1.375rem)] leading-none"><span data-boil-text className="inline-block">parva</span></p>
        <InkArtwork drawing={emblem} label="Duo cuniculi in orbe ovato quiescentes" className="row-start-3 h-auto w-[clamp(10.75rem,8.75rem_+_9vmin,15.5rem)] overflow-visible" />
        <h1 className="row-start-5">
          <InkArtwork drawing={signature} label="mimo" className="h-auto w-[clamp(7.4rem,6rem_+_6vmin,10.5rem)] overflow-visible" />
        </h1>
        <div data-boil-text className="row-start-7 text-[clamp(1.0625rem,0.95rem_+_0.45vmin,1.25rem)] leading-[1.24]">
          <p data-reveal="tagline">Vita non in magnis rebus,<br />sed in parvis est.</p>
          <p data-reveal="about" className="mx-auto mt-[1.2em] max-w-[13.9em] text-justify hyphens-none [text-align-last:center]">Amplexus, poculum tepidum, vesper sine festinatione. Parva, cum amore facta, manent.</p>
        </div>
      </main>
    </InkStage>
  );
}
