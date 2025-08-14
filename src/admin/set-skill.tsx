import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { useSetSkillMutation, Hero, HeroSkill } from "src/generated/graphql";
// Accept only the hero fields this component actually uses to avoid over-constraining
type MinimalHero = Pick<Hero, "id" | "name" | "activeSkill" | "skills">;

export function SetSkill({ hero }: { hero: MinimalHero }): JSX.Element {
  const [skill, setSkill] = useState<HeroSkill>(hero.activeSkill);
  const [level, setLevel] = useState<string>("");
  const [setSkillMutation, { data, loading }] = useSetSkillMutation();

  useEffect(() => {
    console.log(skill, hero.skills);
    setLevel(`${hero.skills[skill]}`);
  }, [skill]);

  function handleSetSkill() {
    if (!level.length) {
      return;
    }
    setSkillMutation({
      variables: {
        id: hero.id,
        skill: skill,
        level: Number(level),
      },
    });
  }

  return (
    <Box>
      <TextField value={level} onChange={(e) => setLevel(e.target.value)} />

      <FormControl sx={{ mb: 5 }}>
        <InputLabel id="set-skill-select-label">Skill</InputLabel>
        <Select
          labelId="set-skill-select-label"
          id="set-skill-select"
          value={skill}
          label="Skill"
          disabled={loading}
          onChange={(e) => setSkill(e.target.value as HeroSkill)}
        >
          {Object.entries(HeroSkill).map(([key, value]) => (
            <MenuItem key={value} value={value}>
              {key}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button disabled={loading} onClick={handleSetSkill}>
        Set {hero.name}'s skill in {skill} to level{" "}
        {Number(level).toLocaleString()}
      </Button>
      {data?.setSkill?.id}
    </Box>
  );
}
