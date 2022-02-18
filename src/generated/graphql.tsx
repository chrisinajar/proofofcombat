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

export type FightResult = {
  __typename?: 'FightResult';
  victory?: Maybe<Scalars['Boolean']>;
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
  name: Scalars['String'];
};

export type MonsterCombatStats = ComatStats & {
  __typename?: 'MonsterCombatStats';
  health: Scalars['Int'];
  maxHealth: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount: BaseAccount;
  fight: FightResult;
  login: LoginResponse;
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
};


export type QueryMonsterArgs = {
  id: Scalars['ID'];
};

export type GetChatTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type GetChatTokenQuery = { __typename?: 'Query', chat: { __typename?: 'ChatResponse', token: string } };

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


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'LoginResponse', account: { __typename?: 'BaseAccount', hero?: { __typename?: 'Hero', name: string, level: number, experience: number, gold: number, location: { __typename?: 'Location', x: number, y: number, map: string }, combat: { __typename?: 'HeroCombatStats', health: number, maxHealth: number }, stats: { __typename?: 'HeroStats', dexterity: number, intelligence: number, charisma: number, constitution: number, wisdom: number, luck: number, strength: number } } | null } } };


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
        name
        level
        experience
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