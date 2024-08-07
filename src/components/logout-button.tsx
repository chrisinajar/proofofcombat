import React from "react";
import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";

import NoSsr from "@mui/material/NoSsr";
import Button from "@mui/material/Button";

import { SxProps } from "@mui/material";

import { useToken } from "src/token";

export function LogoutButton({ sx }: { sx?: SxProps }): JSX.Element | null {
  const router = useRouter();
  const client = useApolloClient();

  const [token, setToken] = useToken();
  function handleLogout() {
    setToken(null);
    client.clearStore();
    router.push("/");
  }

  if (!token) {
    return null;
  }

  return (
    <NoSsr>
      <Button
        aria-label="Logout and return to login screen"
        color="error"
        variant="contained"
        disableElevation
        onClick={handleLogout}
        sx={sx}
      >
        Logout
      </Button>
    </NoSsr>
  );
}
