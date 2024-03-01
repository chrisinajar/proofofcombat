import React, { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import {
  useDeleteAccountMutation,
  AdminAccountQuery,
} from "src/generated/graphql";

export function DeleteAccount({
  account,
}: {
  account: AdminAccountQuery["account"];
}): JSX.Element {
  const [deleteAccountMutation] = useDeleteAccountMutation();
  const [isArmed, setIsArmed] = useState<boolean>(false);

  function deleteAccount() {
    deleteAccountMutation({ variables: { id: account.id } });
  }

  return (
    <Box>
      <br />
      <FormGroup>
        <FormControlLabel
          disabled={!account.banned}
          control={
            <Switch checked={isArmed} onChange={() => setIsArmed(!isArmed)} />
          }
          label={
            account.banned
              ? "Allow Account Deletion"
              : "Must Be Banned to Delete"
          }
        />
      </FormGroup>
      <Button disabled={!isArmed} onClick={deleteAccount}>
        Delete This Account
      </Button>
    </Box>
  );
}
