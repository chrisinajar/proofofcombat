import React, { useState } from "react";
import { words } from "capitalize";

import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import {
  PlayerLocation,
  PlayerLocationType,
  useRecruitMutation,
} from "src/generated/graphql";

export function BuildingDetails({
  location,
}: {
  location: PlayerLocation;
}): JSX.Element {
  return (
    <React.Fragment>
      <ul>
        <li>
          <KeyValuePair name="Building type" value={location.type} />
        </li>
        {location.resources.map((resource) =>
          resource.value > 0 ? (
            <li key={resource.name}>
              <KeyValuePair
                name={words(resource.name)}
                aria-label={`${resource.value.toLocaleString()} out of ${resource.maximum.toLocaleString()}`}
                value={`${resource.value.toLocaleString()} / ${resource.maximum.toLocaleString()}`}
              />
            </li>
          ) : null,
        )}
      </ul>

      {location.type === PlayerLocationType.Barracks && (
        <RecruitButton location={location} />
      )}
    </React.Fragment>
  );
}

function KeyValuePair({
  name,
  value,
  ["aria-label"]: ariaLabel,
}: {
  name: string;
  value: string;
  ["aria-label"]?: string;
}): JSX.Element {
  return (
    <>
      <label
        style={{ fontWeight: "bold" }}
        htmlFor={`building-details-value-${name}`}
      >
        {name}:
      </label>{" "}
      <span aria-label={ariaLabel}>{value}</span>
    </>
  );
}

function RecruitButton({
  location,
}: {
  location: PlayerLocation;
}): JSX.Element {
  const [amount, setAmount] = useState<number>(0);
  const [recruitAction] = useRecruitMutation();

  const validAmount = Number.isFinite(amount) && !isNaN(amount) && amount > 0;

  return (
    <FormControl fullWidth>
      <TextField
        onChange={(e, a) => setAmount(parseInt(e.target.value))}
        id="recruit-input"
        label="Amount of troops to recruit"
      />
      <Button
        variant="contained"
        disabled={!validAmount}
        focusableWhenDisabled
        onClick={() => {
          if (!Number.isFinite(amount) || isNaN(amount)) {
            return;
          }
          recruitAction({
            variables: {
              location: {
                x: location.location.x,
                y: location.location.y,
                map: location.location.map,
              },
              amount,
            },
          });
        }}
      >
        {!validAmount && "Recruit troops"}
        {validAmount &&
          `Recruit ${amount.toLocaleString()} soldiers for ${(
            amount * 1000000
          ).toLocaleString()} gold`}
      </Button>
    </FormControl>
  );
}
