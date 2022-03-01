import { createContext, useContext } from "react";

type DarkModeData = [boolean | null, (darkmode: boolean | null) => void];

export const DarkModeContext = createContext<DarkModeData>([
  null,
  (a: boolean | null) => {},
]);

export function useDarkMode(): DarkModeData {
  return useContext(DarkModeContext);
}
