import {
  useLocationDetailsQuery,
  SpecialLocation,
  LocationDetails,
  PlayerLocation,
} from "src/generated/graphql";

import { useHero } from "src/hooks/use-hero";

export function useLocation(): LocationDetails | null {
  const hero = useHero();

  const { data: locationData } = useLocationDetailsQuery({
    variables: hero?.location
      ? {
          location: {
            x: hero.location.x,
            y: hero.location.y,
            map: hero.location.map,
          },
        }
      : undefined,
    skip: !hero?.location,
  });

  return (locationData?.locationDetails as LocationDetails) ?? null;
}

export function useSpecialLocation(): SpecialLocation | null {
  const locationDetails = useLocation();
  const specialLocations = locationDetails?.specialLocations || [];

  // for now we're only supporting 1 special location
  const specialLocation = specialLocations.length ? specialLocations[0] : null;

  return specialLocation;
}

export function usePlayerLocation(): PlayerLocation | null {
  const locationDetails = useLocation();
  const playerLocations = locationDetails?.playerLocations || [];

  const playerLocation = playerLocations.length ? playerLocations[0] : null;

  return playerLocation;
}

export function useCanVoidTravel(): boolean {
  const locationDetails = useLocation();

  return locationDetails?.voidTravel ?? false;
}
