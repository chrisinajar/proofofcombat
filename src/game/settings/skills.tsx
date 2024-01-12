import React, { useState } from "react";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import {
  Hero,
  HeroSkill,
  useChangeActiveSkillMutation,
  useChangeSkillPercentMutation,
} from "src/generated/graphql";

const SkillDisplayNames: { [x in HeroSkill]: string } = {
  attackingAccuracy: "Attacking Accuracy",
  attackingDamage: "Attacking Damage",
  castingAccuracy: "Casting Accuracy",
  castingDamage: "Casting Damage",
  vitality: "Vitality",

  resilience: "Resilience",
  regeneration: "Regeneration",
};

export function SkillSettings({ hero }: { hero: Hero }): JSX.Element {
  const [skillPercent, setSkillPercent] = useState<number>(hero.skillPercent);

  const [changeActiveSkillMutation, { loading: loadingActiveSkill }] =
    useChangeActiveSkillMutation();
  const [changeSkillPercentMutation, { loading: loadingSkillPercent }] =
    useChangeSkillPercentMutation();

  return (
    <div>
      <Typography variant="h4">Skills</Typography>
      <Typography sx={{ mb: 1 }}>
        Select which skill you would like to improve, as well as percentage of
        how devoted your character is to leveling it up as opposed to receiving
        experience. This means that incoming experience is reduced by the
        percentage, however the amount of experience you gain doesn't affect the
        chances of gaining a skill level.
      </Typography>

      <FormControl sx={{ mb: 5 }}>
        <InputLabel id="active-skill-select-label">Active Skill</InputLabel>
        <Select
          labelId="active-skill-select-label"
          id="active-skill-select"
          value={hero.activeSkill}
          label="Active Skill"
          disabled={loadingActiveSkill}
          onChange={(e) =>
            changeActiveSkillMutation({
              variables: { skill: e.target.value as HeroSkill },
            })
          }
        >
          {Object.values(HeroSkill).map((skill) => (
            <MenuItem key={skill} value={skill}>
              {SkillDisplayNames[skill]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <Slider
          value={skillPercent}
          step={1}
          getAriaValueText={(val) => `${val}%`}
          onChange={(e, value) =>
            !Array.isArray(value) && setSkillPercent(value)
          }
          aria-label="Percent experience towards skills"
          valueLabelDisplay="on"
          disabled={loadingSkillPercent}
        />
        <Button
          disabled={loadingSkillPercent}
          onClick={() =>
            changeSkillPercentMutation({ variables: { percent: skillPercent } })
          }
        >
          Save Percent
        </Button>
      </FormControl>
    </div>
  );
}
