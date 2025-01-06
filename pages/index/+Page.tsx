import getTitle from "@/utils/get-title";
import { createSignal, JSX } from "solid-js";
import { useMetadata } from "vike-metadata-solid";
import { copyTransform } from "../motion-span";

export default function Page() {
  useMetadata({
    title: getTitle("Home"),
  });

  let ref1!: HTMLDivElement;
  let ref2!: HTMLDivElement;

  const [styles, setStyles] = createSignal<JSX.CSSProperties>();

  function handleCopy() {
    const { transform, transformOrigin } = copyTransform(ref1, ref2);

    setStyles({
      transform: transform,
      "transform-origin": transformOrigin,
    });
  }

  return (
    <>
      <div class="flex flex-col items-center justify-center h-full">
        <div class="flex gap-x-20">
          <div ref={ref1} class="bg-opacity-50 bg-red-500 p-20" />
          <div
            ref={ref2}
            class="bg-opacity-50 bg-green-500 h-10 w-64"
            style={styles() ?? undefined}
          />
        </div>
        <button
          class="mt-10 p-4 border bg-blue-500 text-white rounded-xl active:scale-95 transition"
          onClick={handleCopy}
        >
          Make Green copy Red's position and size.
        </button>
      </div>
    </>
  );
}
