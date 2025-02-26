import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import { useSignupMutation } from "src/generated/graphql";

type SignupProps = {
  onSignup?: () => void;
};

export function Signup(props: SignupProps): JSX.Element {
  const { onSignup } = props;
  const result = useSignupMutation();
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signupMutation, { data, loading, error }] = useSignupMutation();

  // console.log(data, loading, error);

  const hasUserError = error && error.message === "Username already exists";

  function checkForEnter(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      handleSignup();
    }
  }

  async function handleSignup() {
    console.log("Attempting to create an account...");
    if (!user.trim().length || !password.trim().length) {
      return;
    }
    try {
      await signupMutation({
        variables: {
          name: user,
          password,
        },
      });

      if (onSignup) {
        onSignup();
      }
    } catch (e) {}
  }

  return (
    <React.Fragment>
      <FormGroup>
        <Typography>
          Create a new account. You must choose a character name that has not
          already been used. You may create as many accounts as you would like,
          however there is no account recovery.
        </Typography>
        <br />
        <TextField
          inputProps={{ 'data-testid': 'signup-username-input' }}
          FormHelperTextProps={{ 'data-testid': 'signup-error-message' } as any}
          helperText={hasUserError && error.message}
          error={hasUserError}
          label="Character Name"
          variant="outlined"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          onKeyPress={checkForEnter}
          disabled={loading}
        />
        <br />
        <TextField
          inputProps={{ 'data-testid': 'signup-password-input' }}
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={checkForEnter}
          disabled={loading}
        />
        <br />
        <Button
          data-testid="signup-submit-button"
          type="submit"
          variant="contained"
          onClick={handleSignup}
          disabled={loading}
        >
          Create Account
        </Button>
        <br />
      </FormGroup>
    </React.Fragment>
  );
}
