import { ArtifactItem } from "src/generated/graphql";

type ArtifactNotification = {
  message: string;
  variant: "success" | "info" | "warning" | "error";
};

export function getArtifactNotification(
  message: string,
  artifactItem?: ArtifactItem | null
): ArtifactNotification {
  if (message.includes("rejected")) {
    return {
      message: "Kept existing artifact",
      variant: "info",
    };
  }

  if (artifactItem) {
    return {
      message: `Equipped ${artifactItem.name}`,
      variant: "success",
    };
  }

  return {
    message,
    variant: "success",
  };
} 