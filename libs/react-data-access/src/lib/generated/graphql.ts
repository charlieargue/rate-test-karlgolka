import { GraphQLResolveInfo } from 'graphql';
import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Card = {
  __typename?: 'Card';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  isMatched: Scalars['Boolean'];
  isTurned: Scalars['Boolean'];
  name: Scalars['String'];
  position: Scalars['Float'];
  updatedAt: Scalars['String'];
};

export type Game = {
  __typename?: 'Game';
  cards: Array<Card>;
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  newGame: Game;
  updateGame: Game;
};


export type MutationUpdateGameArgs = {
  cardId: Scalars['ID'];
  gameId: Scalars['ID'];
  isTurned: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  game: Game;
};


export type QueryGameArgs = {
  id: Scalars['ID'];
};

export type CardFragmentFragment = { __typename?: 'Card', id: string, name: string, position: number, isTurned: boolean, isMatched: boolean, createdAt: string, updatedAt: string };

export type NewGameMutationVariables = Exact<{ [key: string]: never; }>;


export type NewGameMutation = { __typename?: 'Mutation', newGame: { __typename?: 'Game', id: string, createdAt: string, updatedAt: string, cards: Array<{ __typename?: 'Card', id: string, name: string, position: number, isTurned: boolean, isMatched: boolean, createdAt: string, updatedAt: string }> } };

export type GetGameQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetGameQuery = { __typename?: 'Query', game: { __typename?: 'Game', id: string, createdAt: string, updatedAt: string, cards: Array<{ __typename?: 'Card', id: string, name: string, position: number, isTurned: boolean, isMatched: boolean, createdAt: string, updatedAt: string }> } };

export const CardFragmentFragmentDoc = gql`
    fragment CardFragment on Card {
  id
  name
  position
  isTurned
  isMatched
  createdAt
  updatedAt
}
    `;
export const NewGameDocument = gql`
    mutation NewGame {
  newGame {
    id
    cards {
      ...CardFragment
    }
    createdAt
    updatedAt
  }
}
    ${CardFragmentFragmentDoc}`;

export function useNewGameMutation() {
  return Urql.useMutation<NewGameMutation, NewGameMutationVariables>(NewGameDocument);
};
export const GetGameDocument = gql`
    query GetGame($id: ID!) {
  game(id: $id) {
    id
    cards {
      ...CardFragment
    }
    createdAt
    updatedAt
  }
}
    ${CardFragmentFragmentDoc}`;

export function useGetGameQuery(options: Omit<Urql.UseQueryArgs<GetGameQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetGameQuery>({ query: GetGameDocument, ...options });
};


export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Card: ResolverTypeWrapper<Card>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Game: ResolverTypeWrapper<Game>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Card: Card;
  Float: Scalars['Float'];
  Game: Game;
  ID: Scalars['ID'];
  Mutation: {};
  Query: {};
  String: Scalars['String'];
};

export type CardResolvers<ContextType = any, ParentType extends ResolversParentTypes['Card'] = ResolversParentTypes['Card']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isMatched?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isTurned?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  position?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GameResolvers<ContextType = any, ParentType extends ResolversParentTypes['Game'] = ResolversParentTypes['Game']> = {
  cards?: Resolver<Array<ResolversTypes['Card']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  newGame?: Resolver<ResolversTypes['Game'], ParentType, ContextType>;
  updateGame?: Resolver<ResolversTypes['Game'], ParentType, ContextType, RequireFields<MutationUpdateGameArgs, 'cardId' | 'gameId' | 'isTurned'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  game?: Resolver<ResolversTypes['Game'], ParentType, ContextType, RequireFields<QueryGameArgs, 'id'>>;
};

export type Resolvers<ContextType = any> = {
  Card?: CardResolvers<ContextType>;
  Game?: GameResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

