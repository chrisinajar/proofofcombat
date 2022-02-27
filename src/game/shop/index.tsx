import React from "react";

import { useLocationDetailsQuery } from "src/generated/graphql";

import { useHero } from "src/hooks/use-hero";

import { ItemShop } from "./shop";
import { EnchantmentShop } from "./enchantment-shop";

export function Shop(): JSX.Element {
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

  const specialLocation = locationData?.locationDetails.specialLocations[0];
  console.log({ specialLocation });

  return (
    <React.Fragment>
      <ItemShop />
      {specialLocation?.name === "The Hellhound's Fur" && <EnchantmentShop />}
    </React.Fragment>
  );
}
