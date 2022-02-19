import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export enum AttackType {
  Melee = 'MELEE'
}

export type BaseAccount = BaseModel & {
  __typename?: 'BaseAccount';
  hero?: Maybe<Hero>;
  id: Scalars['ID'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type BaseModel = {
  id: Scalars['ID'];
};

export type ChatResponse = {
  __typename?: 'ChatResponse';
  token: Scalars['String'];
};

export type ComatStats = {
  health: Scalars['Int'];
  maxHealth: Scalars['Int'];
};

export type CombatEntry = {
  __typename?: 'CombatEntry';
  attackType: AttackType;
  damage: Scalars['Int'];
  from: Scalars['String'];
  success: Scalars['Boolean'];
  to: Scalars['String'];
};

export type FightResult = {
  __typename?: 'FightResult';
  hero: Hero;
  log?: Maybe<Array<CombatEntry>>;
  monster: MonsterInstance;
  victory: Scalars['Boolean'];
};

export type Hero = BaseModel & {
  __typename?: 'Hero';
  combat: HeroCombatStats;
  experience: Scalars['Int'];
  gold: Scalars['Int'];
  id: Scalars['ID'];
  level: Scalars['Int'];
  location: Location;
  name: Scalars['String'];
  needed: Scalars['Int'];
  stats: HeroStats;
};

export type HeroCombatStats = ComatStats & {
  __typename?: 'HeroCombatStats';
  health: Scalars['Int'];
  maxHealth: Scalars['Int'];
};

export type HeroStats = {
  __typename?: 'HeroStats';
  charisma: Scalars['Int'];
  constitution: Scalars['Int'];
  dexterity: Scalars['Int'];
  intelligence: Scalars['Int'];
  luck: Scalars['Int'];
  strength: Scalars['Int'];
  wisdom: Scalars['Int'];
};

export type Location = {
  __typename?: 'Location';
  map: Scalars['ID'];
  x: Scalars['Int'];
  y: Scalars['Int'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  account: BaseAccount;
  token: Scalars['String'];
};

export type Monster = {
  __typename?: 'Monster';
  combat: MonsterCombatStats;
  id: Scalars['ID'];
  level: Scalars['Int'];
  name: Scalars['String'];
};

export type MonsterCombatStats = ComatStats & {
  __typename?: 'MonsterCombatStats';
  health: Scalars['Int'];
  maxHealth: Scalars['Int'];
};

export type MonsterInstance = BaseModel & {
  __typename?: 'MonsterInstance';
  id: Scalars['ID'];
  location: Location;
  monster: Monster;
};

export type Mutation = {
  __typename?: 'Mutation';
  challenge: MonsterInstance;
  createAccount: BaseAccount;
  fight: FightResult;
  heal: Hero;
  login: LoginResponse;
};


export type MutationChallengeArgs = {
  monster: Scalars['ID'];
};


export type MutationCreateAccountArgs = {
  name: Scalars['String'];
  password: Scalars['String'];
};


export type MutationFightArgs = {
  monster: Scalars['ID'];
};


export type MutationLoginArgs = {
  name: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  chat: ChatResponse;
  hello?: Maybe<Scalars['String']>;
  me: LoginResponse;
  monster: Monster;
  monsters: Array<MonsterInstance>;
};


export type QueryMonsterArgs = {
  id: Scalars['ID'];
};

export type GetChatTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type GetChatTokenQuery = { __typename?: 'Query', chat: { __typename?: 'ChatResponse', token: string } };

export type ChallengeMutationVariables = Exact<{
  monster: Scalars['ID'];
}>;


export type ChallengeMutation = { __typename?: 'Mutation', challenge: { __typename?: 'MonsterInstance', id: string, monster: { __typename?: 'Monster', name: string } } };

export type FightMutationVariables = Exact<{
  monster: Scalars['ID'];
}>;


export type FightMutation = { __typename?: 'Mutation', fight: { __typename?: 'FightResult', victory: boolean, log?: Array<{ __typename?: 'CombatEntry', damage: number, attackType: AttackType, success: boolean, from: string, to: string }> | null, hero: { __typename?: 'Hero', id: string, level: number, experience: number, needed: number, gold: number, combat: { __typename?: 'HeroCombatStats', health: number, maxHealth: number }, stats: { __typename?: 'HeroStats', luck: number, charisma: number, wisdom: number, intelligence: number, constitution: number, dexterity: number, strength: number } }, monster: { __typename?: 'MonsterInstance', id: string, monster: { __typename?: 'Monster', combat: { __typename?: 'MonsterCombatStats', health: number, maxHealth: number } } } } };

export type HealMutationVariables = Exact<{ [key: string]: never; }>;


export type HealMutation = { __typename?: 'Mutation', heal: { __typename?: 'Hero', id: string, combat: { __typename?: 'HeroCombatStats', maxHealth: number, health: number } } };

export type MonstersQueryVariables = Exact<{ [key: string]: never; }>;


export type MonstersQuery = { __typename?: 'Query', monsters: Array<{ __typename?: 'MonsterInstance', id: string, monster: { __typename?: 'Monster', name: string, level: number, combat: { __typename?: 'MonsterCombatStats', health: number, maxHealth: number } } }> };

export type LoginMutationVariables = Exact<{
  name: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', token: string, account: { __typename?: 'BaseAccount', name: string, hero?: { __typename?: 'Hero', name: string, level: number, experience: number, combat: { __typename?: 'HeroCombatStats', health: number, maxHealth: number }, stats: { __typename?: 'HeroStats', strength: number, dexterity: number, constitution: number, intelligence: number, wisdom: number, charisma: number, luck: number } } | null } } };

export type SignupMutationVariables = Exact<{
  name: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignupMutation = { __typename?: 'Mutation', createAccount: { __typename?: 'BaseAccount', name: string, hero?: { __typename?: 'Hero', name: string } | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'LoginResponse', account: { __typename?: 'BaseAccount', hero?: { __typename?: 'Hero', id: string, name: string, level: number, experience: number, needed: number, gold: number, location: { __typename?: 'Location', x: number, y: number, map: string }, combat: { __typename?: 'HeroCombatStats', health: number, maxHealth: number }, stats: { __typename?: 'HeroStats', dexterity: number, intelligence: number, charisma: number, constitution: number, wisdom: number, luck: number, strength: number } } | null } } };


export const GetChatTokenDocument = gql`
    query GetChatToken {
  chat {
    token
  }
}
    `;

/**
 * __useGetChatTokenQuery__
 *
 * To run a query within a React component, call `useGetChatTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatTokenQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetChatTokenQuery(baseOptions?: Apollo.QueryHookOptions<GetChatTokenQuery, GetChatTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChatTokenQuery, GetChatTokenQueryVariables>(GetChatTokenDocument, options);
      }
export function useGetChatTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChatTokenQuery, GetChatTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChatTokenQuery, GetChatTokenQueryVariables>(GetChatTokenDocument, options);
        }
export type GetChatTokenQueryHookResult = ReturnType<typeof useGetChatTokenQuery>;
export type GetChatTokenLazyQueryHookResult = ReturnType<typeof useGetChatTokenLazyQuery>;
export type GetChatTokenQueryResult = Apollo.QueryResult<GetChatTokenQuery, GetChatTokenQueryVariables>;
export const ChallengeDocument = gql`
    mutation Challenge($monster: ID!) {
  challenge(monster: $monster) {
    id
    monster {
      name
    }
  }
}
    `;
export type ChallengeMutationFn = Apollo.MutationFunction<ChallengeMutation, ChallengeMutationVariables>;

/**
 * __useChallengeMutation__
 *
 * To run a mutation, you first call `useChallengeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChallengeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [challengeMutation, { data, loading, error }] = useChallengeMutation({
 *   variables: {
 *      monster: // value for 'monster'
 *   },
 * });
 */
export function useChallengeMutation(baseOptions?: Apollo.MutationHookOptions<ChallengeMutation, ChallengeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChallengeMutation, ChallengeMutationVariables>(ChallengeDocument, options);
      }
export type ChallengeMutationHookResult = ReturnType<typeof useChallengeMutation>;
export type ChallengeMutationResult = Apollo.MutationResult<ChallengeMutation>;
export type ChallengeMutationOptions = Apollo.BaseMutationOptions<ChallengeMutation, ChallengeMutationVariables>;
export const FightDocument = gql`
    mutation Fight($monster: ID!) {
  fight(monster: $monster) {
    victory
    log {
      damage
      attackType
      success
      from
      to
    }
    hero {
      id
      level
      experience
      combat {
        health
        maxHealth
      }
      needed
      gold
      stats {
        luck
        charisma
        wisdom
        intelligence
        constitution
        dexterity
        strength
      }
    }
    monster {
      id
      monster {
        combat {
          health
          maxHealth
        }
      }
    }
  }
}
    `;
export type FightMutationFn = Apollo.MutationFunction<FightMutation, FightMutationVariables>;

/**
 * __useFightMutation__
 *
 * To run a mutation, you first call `useFightMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFightMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [fightMutation, { data, loading, error }] = useFightMutation({
 *   variables: {
 *      monster: // value for 'monster'
 *   },
 * });
 */
export function useFightMutation(baseOptions?: Apollo.MutationHookOptions<FightMutation, FightMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FightMutation, FightMutationVariables>(FightDocument, options);
      }
export type FightMutationHookResult = ReturnType<typeof useFightMutation>;
export type FightMutationResult = Apollo.MutationResult<FightMutation>;
export type FightMutationOptions = Apollo.BaseMutationOptions<FightMutation, FightMutationVariables>;
export const HealDocument = gql`
    mutation Heal {
  heal {
    id
    combat {
      maxHealth
      health
    }
  }
}
    `;
export type HealMutationFn = Apollo.MutationFunction<HealMutation, HealMutationVariables>;

/**
 * __useHealMutation__
 *
 * To run a mutation, you first call `useHealMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHealMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [healMutation, { data, loading, error }] = useHealMutation({
 *   variables: {
 *   },
 * });
 */
export function useHealMutation(baseOptions?: Apollo.MutationHookOptions<HealMutation, HealMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<HealMutation, HealMutationVariables>(HealDocument, options);
      }
export type HealMutationHookResult = ReturnType<typeof useHealMutation>;
export type HealMutationResult = Apollo.MutationResult<HealMutation>;
export type HealMutationOptions = Apollo.BaseMutationOptions<HealMutation, HealMutationVariables>;
export const MonstersDocument = gql`
    query Monsters {
  monsters {
    id
    monster {
      name
      level
      combat {
        health
        maxHealth
      }
    }
  }
}
    `;

/**
 * __useMonstersQuery__
 *
 * To run a query within a React component, call `useMonstersQuery` and pass it any options that fit your needs.
 * When your component renders, `useMonstersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMonstersQuery({
 *   variables: {
 *   },
 * });
 */
export function useMonstersQuery(baseOptions?: Apollo.QueryHookOptions<MonstersQuery, MonstersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MonstersQuery, MonstersQueryVariables>(MonstersDocument, options);
      }
export function useMonstersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MonstersQuery, MonstersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MonstersQuery, MonstersQueryVariables>(MonstersDocument, options);
        }
export type MonstersQueryHookResult = ReturnType<typeof useMonstersQuery>;
export type MonstersLazyQueryHookResult = ReturnType<typeof useMonstersLazyQuery>;
export type MonstersQueryResult = Apollo.QueryResult<MonstersQuery, MonstersQueryVariables>;
export const LoginDocument = gql`
    mutation Login($name: String!, $password: String!) {
  login(name: $name, password: $password) {
    token
    account {
      name
      hero {
        name
        level
        experience
        combat {
          health
          maxHealth
        }
        stats {
          strength
          dexterity
          constitution
          intelligence
          wisdom
          charisma
          luck
        }
      }
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      name: // value for 'name'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SignupDocument = gql`
    mutation Signup($name: String!, $password: String!) {
  createAccount(name: $name, password: $password) {
    name
    hero {
      name
    }
  }
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      name: // value for 'name'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    account {
      hero {
        id
        name
        level
        experience
        needed
        gold
        location {
          x
          y
          map
        }
        combat {
          health
          maxHealth
        }
        stats {
          dexterity
          intelligence
          charisma
          constitution
          wisdom
          luck
          strength
        }
      }
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;