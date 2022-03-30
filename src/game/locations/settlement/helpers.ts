import { PlayerLocation, Location, CampResources } from "src/generated/graphql";

export type BoundingBox = {
  min: Location;
  max: Location;
};

export function getBoundingBox(locations: Location[]): BoundingBox {
  return locations.reduce(
    (box, location) => {
      box.min.x = Math.min(box.min.x, location.x);
      box.min.y = Math.min(box.min.y, location.y);
      box.max.x = Math.max(box.max.x, location.x);
      box.max.y = Math.max(box.max.y, location.y);
      return box;
    },
    {
      min: { map: locations[0].map, x: 127, y: 96 },
      max: { map: locations[0].map, x: 0, y: 0 },
    }
  );
}

export function combineResources(
  ...resources: CampResources[][]
): CampResources[] {
  return resources.reduce<CampResources[]>((total, newResources) => {
    newResources.forEach((entry) => {
      let resource = total.find((res) => res.name === entry.name);
      if (resource) {
        resource.value = resource.value + entry.value;
        if (resource.maximum || entry.maximum) {
          resource.maximum = (resource.maximum ?? 0) + (entry.maximum ?? 0);
        }
      } else {
        total.push({ ...entry });
      }
    });
    return total;
  }, []);
}
