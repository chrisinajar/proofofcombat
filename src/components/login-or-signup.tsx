import React, { useState } from "react";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { Signup } from "./signup";
import { Login } from "./login";

export function LoginOrSignup(): JSX.Element {
  const [showSignup, setShowSignup] = useState<boolean>(false);
  return (
    <Container maxWidth="sm">
      {showSignup && (
        <React.Fragment>
          <Signup onSignup={() => setShowSignup(false)} />
          <Typography>
            Already have an account?
            <Button data-testid="show-login-button" onClick={() => setShowSignup(false)}>Login here</Button>
          </Typography>
        </React.Fragment>
      )}
      {!showSignup && (
        <React.Fragment>
          <Login />
          <Typography>
            Need an account?
            <Button data-testid="show-signup-button" onClick={() => setShowSignup(true)}>Create one</Button>
          </Typography>
        </React.Fragment>
      )}

      <Typography>
        This game is in no way monetized; there are no ads, tracking, cookies,
        analytics, or transactions. I just like making games.
      </Typography>
    </Container>
  );
}
