import {
  useLocationDetailsQuery,
  SpecialLocation,
  LocationDetails,
} from "src/generated/graphql";

import { useHero } from "src/hooks/use-hero";

export function useLocation(): LocationDetails | null {
  const hero = useHero();

  const { data: locationData } = useLocationDetailsQuery({
    fetchPolicy: "network-only",
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

  return locationData?.locationDetails ?? null;
}

export function useSpecialLocation(): SpecialLocation | null {
  const locationDetails = useLocation();
  const specialLocations = locationDetails?.specialLocations || [];

  // for now we're only supporting 1 special location
  const specialLocation = specialLocations.length ? specialLocations[0] : null;

  return specialLocation;
}
