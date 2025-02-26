import React, { useState } from "react";
import { useRouter } from "next/router";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import { useLoginMutation } from "src/generated/graphql";
import { useToken } from "src/token";

export function Login(): JSX.Element {
  const router = useRouter();
  const [token, setToken] = useToken();

  const [loginMutation, { loading, error }] = useLoginMutation();
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function checkForEnter(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      handleLogin();
    }
  }

  async function handleLogin() {
    if (!name.trim().length || !password.trim().length) {
      return;
    }
    try {
      const { data } = await loginMutation({
        variables: { name, password },
      });
      if (!data) {
        return;
      }
      const {
        login: { token: newToken },
      } = data;

      setToken(newToken);
      router.push("/play");
    } catch (e) {}
  }

  return (
    <React.Fragment>
      <FormGroup>
        <Typography>
          This is a game about clicking things and watching numbers go up, login
          if you have an account already.
        </Typography>
        <br />
        <TextField
          inputProps={{ 'data-testid': 'login-username-input' }}
          helperText={!!error && error.message}
          error={!!error}
          label="Character Name"
          variant="outlined"
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
          onKeyPress={checkForEnter}
        />
        <br />
        <TextField
          inputProps={{ 'data-testid': 'login-password-input' }}
          error={!!error}
          label="Password"
          variant="outlined"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          onKeyPress={checkForEnter}
        />
        <br />
        <Button
          data-testid="login-submit-button"
          type="submit"
          variant="contained"
          onClick={handleLogin}
          disabled={loading}
        >
          Play
        </Button>
      </FormGroup>
    </React.Fragment>
  );
}
