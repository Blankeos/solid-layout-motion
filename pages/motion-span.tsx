import { animate } from "motion";
import {
  Accessor,
  createContext,
  createSignal,
  FlowProps,
  onCleanup,
  onMount,
  ParentProps,
  useContext,
} from "solid-js";
import { JSX } from "solid-js/jsx-runtime";

type MotionLayoutContextValue = {
  layoutId?: string;
  sourceRect: Accessor<DOMRect | undefined>;
  setSourceRect: (rect: DOMRect) => void;
};

const MotionLayoutContext = createContext<MotionLayoutContextValue>({
  sourceRect: () => undefined,
  setSourceRect: () => {},
});

const useMotionLayoutContext = () => useContext(MotionLayoutContext);

export function MotionLayoutProvider(props: FlowProps) {
  const [sourceRect, setSourceRect] = createSignal<DOMRect>();

  return (
    <MotionLayoutContext.Provider
      value={{
        sourceRect: sourceRect,
        setSourceRect: setSourceRect,
      }}
    >
      {props.children}
    </MotionLayoutContext.Provider>
  );
}

function span(props: ParentProps<JSX.HTMLAttributes<HTMLSpanElement>>) {
  const { sourceRect, setSourceRect } = useMotionLayoutContext();
  const [ref, setRef] = createSignal<HTMLSpanElement>();

  onMount(() => {
    if (sourceRect()) {
      const transform = copyTransformFromRect(sourceRect()!, ref()!);

      animate(
        ref()!,
        {
          scaleX: [transform.scaleX, 1],
          scaleY: [transform.scaleY, 1],
          x: [transform.translateX, 0],
          y: [transform.translateY, 0],
        },
        {}
      );
    }
  });
  onCleanup(() => {
    if (ref()) {
      setSourceRect(ref()!.getBoundingClientRect());
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

export function copyTransformFromRect(source: DOMRect, target: HTMLElement) {
  // Get the bounding rectangles of both elements
  const sourceBounds = source;
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
  };
}
