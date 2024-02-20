import React, { useState } from "react";
import { words } from "capitalize";

import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";

import LoadingButton from "@mui/lab/LoadingButton";

import {
  PlayerLocation,
  PlayerLocationType,
  useRecruitMutation,
  usePurchaseBondsMutation,
} from "src/generated/graphql";
import { useIsInDelay } from "src/hooks/use-delay";

export function BuildingDetails({
  location,
}: {
  location: PlayerLocation;
}): JSX.Element {
  const [recruitAction, { loading: recruitLoading }] = useRecruitMutation();
  const [purchaseBondsAction, { loading: bondsLoading }] =
    usePurchaseBondsMutation();

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
        <ResourcePurchase
          location={location}
          action="Recruit"
          unit="troops"
          cost={1000000}
          loading={recruitLoading}
          onPurchase={(variables) => {
            recruitAction({
              variables,
            });
          }}
        />
      )}
      {location.type === PlayerLocationType.Treasury && (
        <ResourcePurchase
          location={location}
          action="Purchase"
          unit="bonds"
          cost={1000000}
          loading={bondsLoading}
          onPurchase={(variables) => {
            purchaseBondsAction({
              variables,
            });
          }}
        />
      )}
      {location.type === PlayerLocationType.Treasury && (
        <ResourcePurchase
          location={location}
          action="Sell"
          unit="bonds"
          cost={1000000}
          loading={bondsLoading}
          onPurchase={(variables) => {
            purchaseBondsAction({
              variables: {
                ...variables,
                amount: 0 - variables.amount,
              },
            });
          }}
        />
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

function ResourcePurchase({
  location,
  action,
  unit,
  cost,
  loading = false,
  onPurchase,
}: {
  location: PlayerLocation;
  action: string;
  unit: string;
  cost: number;
  loading: boolean;
  onPurchase: (number) => void;
}): JSX.Element {
  const [amount, setAmount] = useState<number>(0);
  const [recruitAction] = useRecruitMutation();
  const isInDelay = useIsInDelay();

  const validAmount = Number.isFinite(amount) && !isNaN(amount) && amount > 0;

  return (
    <FormControl fullWidth>
      <TextField
        onChange={(e, a) => setAmount(parseInt(e.target.value))}
        id={`${action}-input`}
        label={`Amount of ${unit} to ${action.toLowerCase()}`}
      />
      <LoadingButton
        loading={loading}
        variant="contained"
        disabled={!validAmount || isInDelay}
        onClick={() => {
          if (!Number.isFinite(amount) || isNaN(amount)) {
            return;
          }
          onPurchase({
            location: {
              x: location.location.x,
              y: location.location.y,
              map: location.location.map,
            },
            amount,
          });
        }}
      >
        {!validAmount && `${action} ${unit}`}
        {validAmount &&
          `${action} ${amount.toLocaleString()} ${unit} for ${(
            amount * cost
          ).toLocaleString()} gold`}
      </LoadingButton>
    </FormControl>
  );
}
