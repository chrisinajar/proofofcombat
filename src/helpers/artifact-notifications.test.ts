import { getArtifactNotification } from "./artifact-notifications";
import { ArtifactItem, ArtifactAttributeType } from "src/generated/graphql";

const mockArtifact: ArtifactItem = {
  __typename: "ArtifactItem",
  id: "1",
  owner: "test",
  name: "Test Artifact",
  level: 1,
  attributes: {
    __typename: "ArtifactAttributes",
    namePrefix: { __typename: "ArtifactAttribute", type: ArtifactAttributeType.BonusStrength, magnitude: 1 },
    namePostfix: { __typename: "ArtifactAttribute", type: ArtifactAttributeType.BonusStrength, magnitude: 1 },
    bonusAffixes: [],
    titlePrefix: null,
    titlePostfix: null,
  },
};

describe("getArtifactNotification", () => {
  it("returns 'Kept existing artifact' for rejection messages", () => {
    const result = getArtifactNotification("You rejected the artifact", mockArtifact);
    expect(result.message).toBe("Kept existing artifact");
    expect(result.variant).toBe("info");
  });

  it("returns equipped message for accepted artifacts", () => {
    const result = getArtifactNotification("You accepted the artifact", mockArtifact);
    expect(result.message).toBe("Equipped Test Artifact");
    expect(result.variant).toBe("success");
  });

  it("returns original message when no artifact is provided", () => {
    const message = "Test message";
    const result = getArtifactNotification(message);
    expect(result.message).toBe(message);
    expect(result.variant).toBe("success");
  });
}); 