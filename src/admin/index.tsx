import React, { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

import {
  useAdminAccountsQuery,
  useAdminAccountQuery,
} from "src/generated/graphql";

export default function AdminPage(): JSX.Element {
  const [showData, setShowData] = useState<boolean>(false);
  const [accountId, setAccountId] = useState<string>("");
  const { data, loading, error } = useAdminAccountsQuery();
  const { data: accountData } = useAdminAccountQuery({
    variables: {
      id: accountId,
    },
    skip: !accountId.length,
  });

  if (loading) {
    return <Box>Loading...</Box>;
  }

  function handleChange(e: SelectChangeEvent<string>) {
    setAccountId(e.target.value);
  }

  const accounts = data?.accounts?.accounts;
  const account = accountData?.account;

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="admin-account-select-label">Account</InputLabel>
        <Select
          labelId="admin-account-select-label"
          id="admin-account-select"
          value={accountId}
          label="Account"
          onChange={handleChange}
        >
          {accounts &&
            accounts.map((account) => (
              <MenuItem value={account.id}>{account.name}</MenuItem>
            ))}
        </Select>
      </FormControl>
      <br />
      <Button onClick={() => setShowData(!showData)}>Toggle raw data</Button>
      {showData && <pre>{JSON.stringify(account, null, 2)}</pre>}
    </Box>
  );
}
