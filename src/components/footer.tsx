import React from "react";

import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { visuallyHidden } from "@mui/utils";

import { LogoutButton } from "./logout-button";

export function Footer(): JSX.Element {
  return (
    <React.Fragment>
      <br />
      <Divider />
      <br />
      <Container>
        <Grid container columns={3}>
          <Grid item sm={1} xs={3}>
            <Typography>
              <a
                href="https://github.com/chrisinajar/proofofcombat"
                target="_blank"
                rel="noreferrer"
              >
                Client source code
              </a>
            </Typography>
          </Grid>
          <Grid item sm={1} xs={3}>
            <Typography align="center">
              <a
                href="https://studio.apollographql.com/sandbox/explorer?endpoint=https%3A%2F%2Fchrisinajar.com%3A8443%2Fgraphql"
                target="_blank"
                rel="noreferrer"
              >
                API explorer
              </a>
            </Typography>
          </Grid>
          <Grid item sm={1} xs={3}>
            <Typography align="right">
              <a
                href="https://github.com/chrisinajar/proofofcombat-server"
                target="_blank"
                rel="noreferrer"
              >
                Server source code
              </a>
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <br />
      <br />
      <Typography variant="h1" sx={visuallyHidden}>
        Logout
      </Typography>
      <LogoutButton sx={visuallyHidden} />
    </React.Fragment>
  );
}
