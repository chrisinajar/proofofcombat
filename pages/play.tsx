import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(() => import("src/game"), {
  ssr: false,
});

export default DynamicComponentWithNoSSR;
