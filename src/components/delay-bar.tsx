import React, { useLayoutEffect, useRef } from "react";

type DelayBarProps = {
  delay: number;
};

export function DelayBar({ delay }: DelayBarProps): JSX.Element {
  const barRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!barRef.current) {
      return;
    }
    if (delay <= 0) {
      barRef.current.style.transition = "none";
      barRef.current.style.width = "0%";
      return;
    }
    barRef.current.style.transition = "none";
    barRef.current.style.width = "100%";
    const timer = setTimeout(() => {
      if (!barRef.current) {
        return;
      }
      barRef.current.style.transition = `width ${delay}ms linear 100ms`;
      barRef.current.style.width = "0px";
    }, 1);
    return () => clearTimeout(timer);
  }, [delay, barRef.current]);

  return (
    <div
      id="delay-bar-container"
      className={delay > 0 ? "is-in-delay" : "no-delay"}
      style={{
        width: "100%",
        height: "6px",
        backgroundColor: "#ccc",
      }}
    >
      <div
        id="delay-bar"
        ref={barRef}
        style={{
          height: "100%",
          backgroundColor: "#f0f",
        }}
      ></div>
    </div>
  );
}
