import { createContext, useContext } from "react";

type DelayData = [number, (delay: number) => void];

export const DelayContext = createContext<DelayData>([0, (a: number) => {}]);

export function useDelay(): DelayData {
  return useContext(DelayContext);
}
