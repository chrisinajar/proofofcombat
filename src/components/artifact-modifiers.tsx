import React from "react";

import Typography from "@mui/material/Typography";

import {
  ArtifactItem,
  ArtifactAttributeType,
  ArtifactAttribute,
} from "src/generated/graphql";

export function getArtifactModifier(
  artifact: ArtifactItem,
  type: ArtifactAttributeType
): ArtifactAttribute | undefined {
  const modifiers = modifiersForArtifact(artifact);
  const modifier = modifiers.find((mod) => mod.type === type);
  return modifier;
}

export function modifiersForArtifact(
  artifact: ArtifactItem
): ArtifactAttribute[] {
  const artifactBuffs: ArtifactAttribute[] = [
    artifact.attributes.namePrefix,
    artifact.attributes.namePostfix,
    ...artifact.attributes.bonusAffixes,
  ];

  if (artifact.attributes.titlePrefix) {
    artifactBuffs.push(artifact.attributes.titlePrefix);
  }

  if (artifact.attributes.titlePostfix) {
    artifactBuffs.push(artifact.attributes.titlePostfix);
  }

  return artifactBuffs;
}

function modifierText(modifier: ArtifactAttribute): string {
  const percentage = `${modifier.magnitude * 100 - 100}%`;
  switch (modifier.type) {
    case ArtifactAttributeType.BonusStrength:
      return `${percentage} increased strength`;
      break;

    case ArtifactAttributeType.BonusDexterity:
      return `${percentage} increased dexterity`;
      break;

    case ArtifactAttributeType.BonusConstitution:
      return `${percentage} increased constitution`;
      break;

    case ArtifactAttributeType.BonusIntelligence:
      return `${percentage} increased intelligence`;
      break;

    case ArtifactAttributeType.BonusWisdom:
      return `${percentage} increased wisdom`;
      break;

    case ArtifactAttributeType.BonusWillpower:
      return `${percentage} increased willpower`;
      break;

    case ArtifactAttributeType.BonusLuck:
      return `${percentage} increased luck`;
      break;

    case ArtifactAttributeType.DamageReduction:
      return `${percentage} reduced damage taken`;
      break;

    case ArtifactAttributeType.EnhancedDamage:
      return `${percentage} enhanced damage`;
      break;

    case ArtifactAttributeType.BonusHealth:
      return `${percentage} bonus max health`;
      break;

    case ArtifactAttributeType.ReducedDelay:
      return `${percentage} reduced delay on actions`;
      break;

    case ArtifactAttributeType.BonusExperience:
      return `${percentage} more experience from all sources`;
      break;

    case ArtifactAttributeType.BonusSkillChance:
      return `${percentage} bonus chance to increase skills`;
      break;

    case ArtifactAttributeType.Lifesteal:
      return `${percentage} damage dealt gained as health`;
      break;

    case ArtifactAttributeType.Mesmerize:
      return `${percentage} chance to mesmerize opponents`;
      break;

    case ArtifactAttributeType.Focus:
      return `${percentage} chance to resist mesmerizing`;
      break;
  }
}

export function ArtifactModifiers({
  artifact,
  sx,
}: {
  artifact: ArtifactItem;
  sx?: any;
}): JSX.Element {
  const modifiers = modifiersForArtifact(artifact);
  return (
    <React.Fragment>
      {modifiers.map((modifier) => (
        <Typography variant="body1" key={modifier.type} sx={sx}>
          <b>{modifierText(modifier)}</b>
        </Typography>
      ))}
    </React.Fragment>
  );
}
