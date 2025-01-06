import getTitle from "@/utils/get-title";
import { createSignal, Show } from "solid-js";
import { useMetadata } from "vike-metadata-solid";
import { motionl, MotionLayoutProvider } from "../motion-span";

export default function Page() {
  useMetadata({
    title: getTitle("2 Basic Switch"),
  });

  const [on, setOn] = createSignal(false);

  return (
    <>
      <MotionLayoutProvider>
        <div class="flex flex-col items-center justify-center h-full bg-gradient-to-br from-[#7b2ff7] to-[#f107a3]">
          <div class="relative flex items-center justify-center">
            <div class="z-20 bg-blue-500 w-12 h-12 rounded-full absolute pointer-events-none" />
            <Show when={on()}>
              <motionl.span
                class="rounded-[95px] p-24 bg-white block shadow-2xl will-change-[border-radius]"
                onClick={() => setOn(!on())}
              />
            </Show>
            <Show when={!on()}>
              <motionl.span
                class="rounded-[55px] px-64 py-44 bg-white block"
                onClick={() => setOn(!on())}
              />
            </Show>
          </div>
        </div>
      </MotionLayoutProvider>
    </>
  );
}

function Counter() {
  const [count, setCount] = createSignal(0);

  return (
    <button type="button" onClick={() => setCount((count) => count + 1)}>
      Counter {count()}
    </button>
  );
}
