import React, { useState } from "react";
import { words } from "capitalize";

import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import {
  Hero,
  CampResources,
  PlayerLocation,
  useMoveTroupsMutation,
  useAttackLocationMutation,
} from "src/generated/graphql";

import { AttackResultsModal } from "./attack-results-modal";

export function Military({
  location,
  capital,
  hero,
  resources,
  refetch,
}: {
  location: PlayerLocation | null;
  capital: PlayerLocation;
  hero: Hero;
  resources: CampResources[];
  refetch: () => void;
}): JSX.Element {
  const [enlistedCount, setEnlistedCount] = useState(0);
  const [soldierCount, setSoldierCount] = useState(0);
  const [veteranCount, setVeteranCount] = useState(0);
  const [ghostCount, setGhostCount] = useState(0);
  const [isAttackResultsOpen, setAttackResultsOpen] = useState(false);
  const [moveTroupsMutation] = useMoveTroupsMutation();
  const [attackLocationMutation, { data: attackData, loading: attackLoading }] =
    useAttackLocationMutation();
  const hostileTarget = location?.owner !== hero.id;

  const enlistedResource = location?.resources?.find(
    (r) => r.name === "enlisted",
  );
  const soldierResource = location?.resources?.find(
    (r) => r.name === "soldier",
  );
  const veteranResource = location?.resources?.find(
    (r) => r.name === "veteran",
  );
  const ghostResource = location?.resources?.find((r) => r.name === "ghost");

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setEnlistedCount(newValue as number);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnlistedCount(
      event.target.value === "" ? 0 : Number(event.target.value),
    );
  };

  const resourceMap: { [x in string]: CampResources } = {};
  resources.forEach((resource) => {
    resourceMap[resource.name] = resource;
  });

  function handleMoveTroups() {
    if (!location) {
      return;
    }
    moveTroupsMutation({
      variables: {
        target: {
          x: location.location.x,
          y: location.location.y,
          map: location.location.map,
        },
        units: {
          enlisted: enlistedCount,
          soldier: soldierCount,
          veteran: veteranCount,
          ghost: ghostCount,
        },
      },
    });
  }

  async function handleAttackLocation() {
    if (!location) {
      return;
    }
    const { data } = await attackLocationMutation({
      variables: {
        target: {
          x: location.location.x,
          y: location.location.y,
          map: location.location.map,
        },
        units: {
          enlisted: enlistedCount,
          soldier: soldierCount,
          veteran: veteranCount,
          ghost: ghostCount,
        },
      },
    });

    if (data?.attackLocation) {
      setAttackResultsOpen(true);
      if (data.attackLocation.target.owner === hero.id) {
        refetch();
      }
    }
  }

  return (
    <>
      <AttackResultsModal
        open={isAttackResultsOpen}
        onClose={() => setAttackResultsOpen(false)}
        attackResults={attackData?.attackLocation}
        loading={attackLoading}
        hero={hero}
      />
      <Typography variant="h4">Military actions</Typography>
      <Typography variant="body1">
        Use this UI to move your tropps or attack adjacent empires. You can only
        attack buildings owned by other players which are adjacent to your own.
        If you deal enough damage then the building will be converted over to
        your control.
      </Typography>
      <br />
      <Typography variant="h6" component="h4">
        Remaining attacks: {capital.remainingAttacks}
      </Typography>
      <br />
      <Typography variant="h5">Current target</Typography>
      {!location && (
        <Typography variant="body1">Select a target using the map.</Typography>
      )}
      {location && (
        <ul>
          <li>
            <label
              style={{ fontWeight: "bold" }}
              htmlFor="military-target-location"
            >
              Location:
            </label>{" "}
            <span id="military-target-location">
              {location.location.x}, {location.location.y}
            </span>
          </li>
          <li>
            <label
              style={{ fontWeight: "bold" }}
              htmlFor="military-target-type"
            >
              Type:
            </label>{" "}
            <span id="military-target-type">{location.type}</span>
          </li>
          <li>
            <label
              style={{ fontWeight: "bold" }}
              htmlFor="military-target-owner"
            >
              Owner:
            </label>{" "}
            <span id="military-target-owner">{location.publicOwner?.name}</span>
          </li>
        </ul>
      )}
      {!location && (
        <ul>
          <li>
            <label
              style={{ fontWeight: "bold" }}
              htmlFor="military-unit-info-enlisted"
            >
              Enlisted:
            </label>{" "}
            <span id="military-target-enlisted">
              {(resourceMap.enlisted?.value ?? 0).toLocaleString()}
            </span>
          </li>
          <li>
            <label
              style={{ fontWeight: "bold" }}
              htmlFor="military-unit-info-soldier"
            >
              Soldier:
            </label>{" "}
            <span id="military-target-soldier">
              {(resourceMap.soldier?.value ?? 0).toLocaleString()}
            </span>
          </li>
          <li>
            <label
              style={{ fontWeight: "bold" }}
              htmlFor="military-unit-info-veteran"
            >
              Veteran:
            </label>{" "}
            <span id="military-target-veteran">
              {(resourceMap.veteran?.value ?? 0).toLocaleString()}
            </span>
          </li>
          {(resourceMap.ghost?.value ?? 0) > 0 && (
            <li>
              <label
                style={{ fontWeight: "bold" }}
                htmlFor="military-unit-info-ghost"
              >
                Ghost:
              </label>{" "}
              <span id="military-target-ghost">
                {(resourceMap.ghost?.value ?? 0).toLocaleString()}
              </span>
            </li>
          )}
        </ul>
      )}
      {location && (
        <>
          <Typography variant="h5">Troups in this location</Typography>
          <ul>
            {(enlistedResource?.value ?? 0) > 0 && (
              <li>
                <label
                  style={{ fontWeight: "bold" }}
                  htmlFor="military-unit-info-enlisted"
                >
                  Enlisted:
                </label>{" "}
                <span id="military-target-enlisted">
                  {(enlistedResource?.value ?? 0).toLocaleString()}
                </span>
              </li>
            )}
            {(soldierResource?.value ?? 0) > 0 && (
              <li>
                <label
                  style={{ fontWeight: "bold" }}
                  htmlFor="military-unit-info-soldier"
                >
                  Soldier:
                </label>{" "}
                <span id="military-target-soldier">
                  {(soldierResource?.value ?? 0).toLocaleString()}
                </span>
              </li>
            )}
            {(veteranResource?.value ?? 0) > 0 && (
              <li>
                <label
                  style={{ fontWeight: "bold" }}
                  htmlFor="military-unit-info-veteran"
                >
                  Veteran:
                </label>{" "}
                <span id="military-target-veteran">
                  {(veteranResource?.value ?? 0).toLocaleString()}
                </span>
              </li>
            )}
            {(ghostResource?.value ?? 0) > 0 && (
              <li>
                <label
                  style={{ fontWeight: "bold" }}
                  htmlFor="military-unit-info-ghost"
                >
                  Ghost:
                </label>{" "}
                <span id="military-target-ghost">
                  {(ghostResource?.value ?? 0).toLocaleString()}
                </span>
              </li>
            )}
          </ul>
          <Typography mb={2} component="h6" variant="h5">
            Troops to send
          </Typography>
          <Grid container columns={6} spacing={2}>
            <MilitaryTroopSlider
              name="enlisted"
              value={enlistedCount}
              onChange={setEnlistedCount}
              max={
                hostileTarget
                  ? resourceMap.enlisted?.value ?? 0
                  : Math.min(
                      resourceMap.enlisted?.value ?? 0,
                      (enlistedResource?.maximum ?? 0) -
                        (enlistedResource?.value ?? 0),
                    )
              }
            />
            <MilitaryTroopSlider
              name="soldier"
              value={soldierCount}
              onChange={setSoldierCount}
              max={
                hostileTarget
                  ? resourceMap.soldier?.value ?? 0
                  : Math.min(
                      resourceMap.soldier?.value ?? 0,
                      (soldierResource?.maximum ?? 0) -
                        (soldierResource?.value ?? 0),
                    )
              }
            />
            <MilitaryTroopSlider
              name="veteran"
              value={veteranCount}
              onChange={setVeteranCount}
              max={
                hostileTarget
                  ? resourceMap.veteran?.value ?? 0
                  : Math.min(
                      resourceMap.veteran?.value ?? 0,
                      (veteranResource?.maximum ?? 0) -
                        (veteranResource?.value ?? 0),
                    )
              }
            />
            <MilitaryTroopSlider
              name="ghost"
              value={ghostCount}
              onChange={setGhostCount}
              max={
                hostileTarget
                  ? resourceMap.ghost?.value ?? 0
                  : Math.min(
                      resourceMap.ghost?.value ?? 0,
                      (ghostResource?.maximum ?? 0) -
                        (ghostResource?.value ?? 0),
                    )
              }
            />
          </Grid>
          {hostileTarget && (
            <Button onClick={handleAttackLocation}>Attack target</Button>
          )}
          {!hostileTarget && (
            <Button onClick={handleMoveTroups}>Move troops</Button>
          )}
        </>
      )}
    </>
  );
}

function MilitaryTroopSlider({
  name,
  onChange,
  value,
  max,
}: {
  name: string;
  onChange: (value: number) => void;
  value: number;
  max: number;
}): JSX.Element | null {
  if (max === 0) {
    return null;
  }
  return (
    <>
      <Grid item xs={1}>
        <label id={`military-slider-${name}-label`}>{words(name)}:</label>
      </Grid>
      <Grid item xs={3}>
        <FormControl fullWidth>
          <Slider
            value={value}
            onChange={(e, v) => onChange(v as number)}
            min={0}
            max={max}
            valueLabelDisplay="auto"
            getAriaValueText={(num) => num.toLocaleString()}
            aria-labelledby={`military-slider-${name}-label`}
          />
        </FormControl>
      </Grid>
      <Grid item xs={2}>
        <FormControl fullWidth>
          <Input
            value={value}
            size="small"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onChange(
                event.target.value === "" ? 0 : Number(event.target.value),
              )
            }
            onBlur={() => {
              if (value < 0) {
                onChange(0);
              } else if (value > max) {
                onChange(max);
              }
            }}
            inputProps={{
              step: 1,
              min: 0,
              max,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </FormControl>
      </Grid>
    </>
  );
}
