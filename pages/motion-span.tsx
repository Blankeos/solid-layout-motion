import { animate } from "motion";
import {
  createContext,
  createSignal,
  FlowProps,
  onCleanup,
  onMount,
  ParentProps,
  useContext,
} from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { createStore, SetStoreFunction } from "solid-js/store";

type MotionLayoutContextValue = {
  layoutId?: string;
  sourceData: Partial<SourceData>;
  setSourceData: SetStoreFunction<Partial<SourceData>>;
};

const MotionLayoutContext = createContext<MotionLayoutContextValue>({
  sourceData: {},
  setSourceData: () => {},
});

const useMotionLayoutContext = () => useContext(MotionLayoutContext);

export function MotionLayoutProvider(props: FlowProps) {
  const [sourceData, setSourceData] = createStore<Partial<SourceData>>({});

  return (
    <MotionLayoutContext.Provider
      value={{
        sourceData: sourceData,
        setSourceData: setSourceData,
      }}
    >
      {props.children}
    </MotionLayoutContext.Provider>
  );
}

function span(props: ParentProps<JSX.HTMLAttributes<HTMLSpanElement>>) {
  const { sourceData, setSourceData } = useMotionLayoutContext();
  const [ref, setRef] = createSignal<HTMLSpanElement>();

  onMount(() => {
    if (sourceData.borderRadius && sourceData.domRect) {
      const transform = copyTransformFromRect(
        {
          borderRadius: sourceData.borderRadius,
          domRect: sourceData.domRect,
        },
        ref()!
      );

      const original = {
        borderRadius: getComputedStyle(ref()!).borderRadius,
      };

      animate(
        ref()!,
        {
          scaleX: [transform.scaleX, 1],
          scaleY: [transform.scaleY, 1],
          x: [transform.translateX, 0],
          y: [transform.translateY, 0],
          borderRadius: [sourceData.borderRadius, original.borderRadius],
        },
        {
          ease: "backOut",
          duration: 0.4,
        }
      );
    }
  });
  onCleanup(() => {
    if (ref()) {
      const borderRadius = getComputedStyle(ref()!).borderRadius;

      setSourceData({
        borderRadius: borderRadius,
        domRect: ref()!.getBoundingClientRect(),
      });
    }
  });

  return (
    <span ref={setRef} {...props}>
      {props.children}
    </span>
  );
}

export const motionl = {
  span,
};

// Utilities

/** This is awesome, it works. */
export function copyTransform(source: HTMLElement, target: HTMLElement) {
  // Get the bounding rectangles of both elements
  const sourceBounds = source.getBoundingClientRect();
  const targetBounds = target.getBoundingClientRect();

  // Calculate the scale factors needed
  const scaleX = sourceBounds.width / targetBounds.width;
  const scaleY = sourceBounds.height / targetBounds.height;

  // Calculate the distances between the elements' centers
  const sourceCenter = {
    x: sourceBounds.left + sourceBounds.width / 2,
    y: sourceBounds.top + sourceBounds.height / 2,
  };

  const targetCenter = {
    x: targetBounds.left + targetBounds.width / 2,
    y: targetBounds.top + targetBounds.height / 2,
  };

  // Calculate the translation needed to align centers
  const translateX = sourceCenter.x - targetCenter.x;
  const translateY = sourceCenter.y - targetCenter.y;

  // Transform origin is half the target's dimensions
  const transformOriginX = targetBounds.width / 2;
  const transformOriginY = targetBounds.height / 2;

  return {
    transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scaleX}, ${scaleY})`,
    transformOrigin: `${transformOriginX}px ${transformOriginY}px`,
  };
}

type SourceData = {
  domRect: DOMRect;
  borderRadius: string;
};

export function copyTransformFromRect(source: SourceData, target: HTMLElement) {
  // Get the bounding rectangles of both elements
  const sourceBounds = source.domRect;
  const targetBounds = target.getBoundingClientRect();

  // Calculate the scale factors needed
  const scaleX = sourceBounds.width / targetBounds.width;
  const scaleY = sourceBounds.height / targetBounds.height;

  // Calculate the distances between the elements' centers
  const sourceCenter = {
    x: sourceBounds.left + sourceBounds.width / 2,
    y: sourceBounds.top + sourceBounds.height / 2,
  };

  const targetCenter = {
    x: targetBounds.left + targetBounds.width / 2,
    y: targetBounds.top + targetBounds.height / 2,
  };

  // Calculate the translation needed to align centers
  const translateX = sourceCenter.x - targetCenter.x;
  const translateY = sourceCenter.y - targetCenter.y;

  // Transform origin is half the target's dimensions
  const transformOriginX = targetBounds.width / 2;
  const transformOriginY = targetBounds.height / 2;

  return {
    transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scaleX}, ${scaleY})`,
    transformOrigin: `${transformOriginX}px ${transformOriginY}px`,
    translateX,
    translateY,
    scaleX,
    scaleY,
    borderRadius: source.borderRadius,
  };
}
