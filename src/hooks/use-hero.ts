import { useMeQuery, Hero } from "src/generated/graphql";

export function useHero(): Hero | undefined {
  const { data } = useMeQuery({
    fetchPolicy: "cache-only",
  });

  return (data?.me?.account?.hero as Hero) ?? undefined;
}
