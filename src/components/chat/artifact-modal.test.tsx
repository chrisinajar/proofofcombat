import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { MockedProvider } from "@apollo/client/testing";
import { ArtifactModal } from "./artifact-modal";
import { ArtifactAttributeType } from "src/generated/graphql";

const equippedArtifact = {
  __typename: "ArtifactItem" as const,
  id: "current-id",
  owner: "test-owner",
  name: "Super Equipped Test Artifact",
  level: 1,
  attributes: {
    __typename: "ArtifactAttributes" as const,
    namePrefix: { __typename: "ArtifactAttribute" as const, type: ArtifactAttributeType.BonusPhysicalDamage, magnitude: 1 },
    namePostfix: { __typename: "ArtifactAttribute" as const, type: ArtifactAttributeType.BonusHealth, magnitude: 1 },
    bonusAffixes: [],
    titlePrefix: null,
    titlePostfix: null,
  },
};

const newArtifact = {
  __typename: "ArtifactItem" as const,
  id: "test-id",
  owner: "test-owner",
  name: "Goofy Test Artifact of Testing",
  level: 1,
  attributes: {
    __typename: "ArtifactAttributes" as const,
    namePrefix: { __typename: "ArtifactAttribute" as const, type: ArtifactAttributeType.BonusPhysicalDamage, magnitude: 1 },
    namePostfix: { __typename: "ArtifactAttribute" as const, type: ArtifactAttributeType.BonusHealth, magnitude: 1 },
    bonusAffixes: [],
    titlePrefix: null,
    titlePostfix: null,
  },
};

describe("ArtifactModal", () => {
  it("handles artifact selection and confirmation flow when current artifact exists", async () => {
    const user = userEvent.setup();
    
    render(
      <MockedProvider>
        <ArtifactModal currentArtifact={equippedArtifact} newArtifact={newArtifact} />
      </MockedProvider>
    );

    // Initial state: both artifacts rendered, button disabled
    expect(screen.getByText(equippedArtifact.name)).toBeInTheDocument();
    expect(screen.getByText(newArtifact.name)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continue with selected/i })).toBeDisabled();

    // Select new artifact and verify button enables
    await user.click(screen.getByText(newArtifact.name));
    expect(screen.getByRole('button', { name: /continue with selected/i })).toBeEnabled();

    // Open and verify confirmation dialog with warning
    await user.click(screen.getByRole('button', { name: /continue with selected/i }));
    expect(screen.getByText("Are you sure you want to keep the new artifact?")).toBeInTheDocument();
    expect(screen.getByText("This action cannot be undone.")).toBeInTheDocument();
  });

  it("automatically selects new artifact when no current artifact exists", async () => {
    const user = userEvent.setup();
    render(
      <MockedProvider>
        <ArtifactModal currentArtifact={null} newArtifact={newArtifact} />
      </MockedProvider>
    );

    // Verify initial state
    expect(screen.getByText("You have no artifact equipped. The new artifact will be automatically equipped.")).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /accept new artifact/i })).toBeEnabled();

    // Open and verify confirmation dialog
    await user.click(screen.getByRole('button', { name: /accept new artifact/i }));
    expect(screen.getByText("Are you sure you want to equip the new artifact?")).toBeInTheDocument();
    expect(screen.queryByText("This action cannot be undone.")).not.toBeInTheDocument();
  });
}); 