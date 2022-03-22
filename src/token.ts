import React from "react";

type TokenType = string | null;
type TokenSetter = (token: TokenType) => void;
type TokenData = [token: TokenType, setToken: TokenSetter];

const setToken: TokenSetter = (newToken: TokenType) => {
  tokenData[0] = newToken;
  if (typeof sessionStorage !== "undefined") {
    sessionStorage.token = newToken;
  }
};
const tokenData: TokenData = [
  typeof sessionStorage !== "undefined" ? sessionStorage.token ?? null : null,
  setToken,
];

export const TokenContext = React.createContext<TokenData>(tokenData);

export function useToken() {
  return React.useContext(TokenContext);
}
