import React from "react";

import Divider from "@mui/material/Divider";

import { useLocation, useSpecialLocation } from "src/hooks/use-location";
import { useHero } from "src/hooks/use-hero";

import { NpcShop } from "../locations/npc-shop";
import { ItemShop } from "./shop";

export function Shop(): JSX.Element {
  const hero = useHero();

  const locationDetails = useLocation();
  const specialLocation = useSpecialLocation();

  // const { data: locationData } = useLocationDetailsQuery({
  //   variables: hero?.location
  //     ? {
  //         location: {
  //           x: hero.location.x,
  //           y: hero.location.y,
  //           map: hero.location.map,
  //         },
  //       }
  //     : undefined,
  //   skip: !hero?.location,
  // });

  // const specialLocation = locationData?.locationDetails.specialLocations[0];
  // console.log({ specialLocation });

  return (
    <React.Fragment>
      <ItemShop />

      {locationDetails?.shop && <NpcShop shop={locationDetails?.shop} />}
    </React.Fragment>
  );
}
