import React from "react";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import {
  useBanAccountMutation,
  useUnbanAccountMutation,
  AdminAccountQuery,
} from "src/generated/graphql";

export function BanToggle({
  account,
}: {
  account: AdminAccountQuery["account"];
}): JSX.Element {
  const [banAccount] = useBanAccountMutation();
  const [unbanAccount] = useUnbanAccountMutation();

  function toggleBan() {
    if (account.banned) {
      unbanAccount({ variables: { id: account.id } });
    } else {
      banAccount({ variables: { id: account.id } });
    }
  }

  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch checked={account.banned} onChange={toggleBan} />}
        label={account.banned ? "Currently Banned" : "Not Banned"}
      />
    </FormGroup>
  );
}
