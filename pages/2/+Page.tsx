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
        <div class="flex flex-col items-center justify-center h-full bg-gray-200">
          <button
            class="rounded-full border p-5 relative w-32 bg-white active:scale-95 transition items-center flex h-20"
            onClick={() => setOn(!on())}
          >
            <Show when={on()}>
              <motionl.span class="block rounded-full bg-blue-500 h-10 w-10 absolute left-5" />
            </Show>

            <Show when={!on()}>
              <motionl.span class="block rounded-full bg-blue-500 h-10 w-10 absolute right-5" />
            </Show>
          </button>
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
