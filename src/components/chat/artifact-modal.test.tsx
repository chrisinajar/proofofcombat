import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { MockedProvider } from "@apollo/client/testing";
import { ArtifactModal } from "./artifact-modal";
import { MeDocument, ArtifactAttributeType } from "src/generated/graphql";

const mockArtifact = {
  __typename: "ArtifactItem" as const,
  id: "test-id",
  owner: "test-owner",
  name: "Test Artifact",
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

const mocks = [
  {
    request: {
      query: MeDocument,
    },
    result: {
      data: {
        me: {
          account: {
            hero: {
              equipment: {
                artifact: {
                  ...mockArtifact,
                  id: "current-id",
                  name: "Current Artifact",
                },
              },
            },
          },
        },
      },
    },
  },
];

describe("ArtifactModal", () => {
  it("renders both artifacts and allows selection", async () => {
    const user = userEvent.setup();
    const { getByText } = render(
      <MockedProvider mocks={mocks}>
        <ArtifactModal artifact={mockArtifact} />
      </MockedProvider>
    );

    // Check that both artifacts are rendered
    expect(getByText("Current Artifact")).toBeInTheDocument();
    expect(getByText("Test Artifact")).toBeInTheDocument();

    // Continue button should be disabled initially
    const continueButton = getByText("Continue with Selected");
    expect(continueButton).toBeDisabled();

    // Select new artifact
    await user.click(getByText("Test Artifact"));
    expect(continueButton).toBeEnabled();

    // Open confirmation dialog
    await user.click(continueButton);
    expect(getByText("Confirm Your Choice")).toBeInTheDocument();
    expect(getByText(/Are you sure you want to keep the new artifact/)).toBeInTheDocument();
  });

  it("shows warning message in confirmation dialog", async () => {
    const user = userEvent.setup();
    const { getByText } = render(
      <MockedProvider mocks={mocks}>
        <ArtifactModal artifact={mockArtifact} />
      </MockedProvider>
    );

    // Select new artifact and open confirmation
    await user.click(getByText("Test Artifact"));
    await user.click(getByText("Continue with Selected"));

    // Check warning message
    expect(getByText("This action cannot be undone.")).toBeInTheDocument();
  });
}); 