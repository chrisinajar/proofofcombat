import { useMeQuery, Hero } from "src/generated/graphql";

export function useHero(): Hero | undefined {
  const { data } = useMeQuery();

  return data?.me?.account?.hero ?? undefined;
}
