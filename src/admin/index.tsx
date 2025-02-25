import React, { useState, useMemo } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

import {
  useAdminAccountsQuery,
  useAdminAccountQuery,
  useSpawnRandomBossMutation,
} from "src/generated/graphql";

import { CreateItem } from "./create-item";
import { GiveGold } from "./give-gold";
import { SetSkill } from "./set-skill";
import { AddLevels } from "./add-levels";
import { BanToggle } from "./ban-toggle";
import { DeleteAccount } from "./delete-account";
import { GenerateArtifact } from "./generate-artifact";

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
  const [spawnBossMutation, { loading: spawnLoading }] =
    useSpawnRandomBossMutation();

  const accounts = useMemo(
    () => (data?.accounts?.accounts ? [...data?.accounts?.accounts] : []),
    [data?.accounts?.accounts.length],
  );

  if (loading) {
    return <Box>Loading...</Box>;
  }

  function handleChange(e: SelectChangeEvent<string>) {
    setAccountId(e.target.value);
  }
  function handleAberrationSpawn() {
    spawnBossMutation();
  }
  const account = accountData?.account;

  return (
    <Box>
      <br />
      <Button disabled={spawnLoading} onClick={handleAberrationSpawn}>
        Spawn Aberration
      </Button>
      <br />
      <br />
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
            accounts
              .sort((a, b) => (a.name > b.name ? 1 : -1))
              .map((account) => (
                <MenuItem key={account.id} value={account.id}>
                  {account.name}
                </MenuItem>
              ))}
        </Select>
      </FormControl>
      <br />
      <br />
      <br />
      {account && <GenerateArtifact account={account} />}
      {account && <CreateItem account={account} />}
      {account && <GiveGold account={account} />}
      {account?.hero && <SetSkill hero={account.hero} />}
      {account && <AddLevels account={account} />}
      {account && <BanToggle account={account} />}
      {account && <DeleteAccount account={account} />}
      <br />
      <br />
      <br />
      <Button onClick={() => setShowData(!showData)}>Toggle raw data</Button>
      {showData && <pre>{JSON.stringify(account, null, 2)}</pre>}
    </Box>
  );
}
