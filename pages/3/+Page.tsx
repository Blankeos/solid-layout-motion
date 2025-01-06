import getTitle from "@/utils/get-title";
import { createMemo, createSignal, For, Show } from "solid-js";
import { useMetadata } from "vike-metadata-solid";
import { motionl, MotionLayoutProvider } from "../motion-span";

export default function Page() {
  useMetadata({
    title: getTitle("3 Shared Layout"),
  });

  const tabs = [
    {
      value: "apple",
      label: "Apple",
      emoji: "🍎",
    },
    {
      value: "banana",
      label: "Banana",
      emoji: "🍌",
    },
    {
      value: "orange",
      label: "Orange",
      emoji: "🍊",
    },
  ];

  const [selectedTab, setSelectedTab] = createSignal<(typeof tabs)[number]["value"]>(tabs[0].value);

  const currentTab = createMemo(() => tabs.find((t) => t.value === selectedTab()));

  return (
    <>
      <MotionLayoutProvider>
        <div class="flex flex-col items-center justify-center h-full bg-gray-200">
          <div class="rounded-md border flex flex-col bg-white border-neutral-300">
            <nav class="border-b flex overflow-hidden">
              <For each={tabs}>
                {(tab) => (
                  <button
                    class="relative flex items-center justify-center w-full px-12 py-4 text-sm font-medium text-gray-700 rounded-t-md hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedTab(tab.value)}
                  >
                    <span class="relative">{tab.label}</span>
                    <Show when={tab.value === selectedTab()}>
                      <motionl.span class="bg-purple-500 absolute bottom-0 left-0 right-0 h-1" />
                    </Show>
                  </button>
                )}
              </For>
            </nav>

            <div class="h-32 bg-white rounded-b-md items-center flex justify-center text-5xl">
              {currentTab()?.emoji}
            </div>
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
