import getTitle from "@/utils/get-title";
import { type FlowProps } from "solid-js";
import { useMetadata } from "vike-metadata-solid";

import "@/styles/app.css";
import { usePageContext } from "vike-solid/usePageContext";

useMetadata.setGlobalDefaults({
  title: getTitle("Home"),
  description: "Demo showcasing Vike and Solid.",
});

export default function RootLayout(props: FlowProps) {
  return (
    <>
      <div class="flex flex-col h-screen">
        <nav class="flex gap-x-10 w-full border-b border-neutral-500 py-3 items-center justify-center">
          <NavLink href="/">1. Demonstration of Copy</NavLink>
          <NavLink href="/2">2. Basic Switch</NavLink>
          <NavLink href="/3">3. Shared Layout Animation</NavLink>
          <NavLink href="/4">4. Expanding Container (Like Family)</NavLink>
        </nav>

        <div class="flex-1 h-full flex-grow">{props.children}</div>
      </div>
    </>
  );
}

function NavLink(props: FlowProps<{ href: string }>) {
  const pageContext = usePageContext();

  return (
    <a
      href={props.href}
      class={`hover:underline truncate ${pageContext.urlPathname === props.href ? "text-blue-500" : ""}`}
    >
      {props.children}
    </a>
  );
}
