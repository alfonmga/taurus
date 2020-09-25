/*eslint-disable */
import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
// The file generated on: 2020-09-23T15:16:04+02:00

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any
}

export type ChatMessage = {
  id: Scalars['ID']
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  user: User
  message: Scalars['String']
}

export type User = {
  id: Scalars['ID']
  updatedAt: Scalars['DateTime']
  createdAt: Scalars['DateTime']
  username: Scalars['String']
  email: Scalars['String']
  avatarUrl: Scalars['String']
  displayName: Scalars['String']
}

export type UserProfileType = {
  username: Scalars['String']
  avatarUrl: Scalars['String']
  displayName: Scalars['String']
}

export type InputErrorFieldType = {
  path: Scalars['String']
  message: Scalars['String']
}

export type PaginatedChatMessagesDTO = {
  data: Array<ChatMessage>
  offset: Scalars['Int']
  limit: Scalars['Int']
  totalCount: Scalars['Int']
}

export type Query = {
  profile: UserProfileType
  chatMessages: PaginatedChatMessagesDTO
}

export type QuerychatMessagesArgs = {
  dto: PaginationDTO
}

export type PaginationDTO = {
  offset?: Maybe<Scalars['Int']>
  limit?: Maybe<Scalars['Int']>
}

export type Mutation = {
  createChatMessage: CreateChatMessageUnion
}

export type MutationcreateChatMessageArgs = {
  dto: CreateChatMessageDTO
}

export type CreateChatMessageUnion = SuccessfulCreatedType | InputErrorType

export type SuccessfulCreatedType = {
  success: Scalars['Boolean']
  id: Scalars['ID']
}

export type InputErrorType = {
  validationErrors: Array<InputErrorFieldType>
}

export type CreateChatMessageDTO = {
  message: Scalars['String']
}

export type CreateChatMessageMutationVariables = Exact<{
  dto: CreateChatMessageDTO
}>

export type CreateChatMessageMutation = {
  createChatMessage:
    | ({ __typename: 'SuccessfulCreatedType' } & Pick<
        SuccessfulCreatedType,
        'id'
      >)
    | ({ __typename: 'InputErrorType' } & {
        validationErrors: Array<Pick<InputErrorFieldType, 'path' | 'message'>>
      })
}

export type ChatMessagesQueryVariables = Exact<{
  dto: PaginationDTO
}>

export type ChatMessagesQuery = {
  chatMessages: Pick<
    PaginatedChatMessagesDTO,
    'limit' | 'offset' | 'totalCount'
  > & {
    data: Array<
      Pick<ChatMessage, 'id' | 'message' | 'createdAt'> & {
        user: Pick<User, 'avatarUrl' | 'displayName' | 'username'>
      }
    >
  }
}

export type DashboardQueryVariables = Exact<{ [key: string]: never }>

export type DashboardQuery = {
  profile: Pick<UserProfileType, 'username' | 'avatarUrl' | 'displayName'>
  prefetchChatMessages: Pick<
    PaginatedChatMessagesDTO,
    'limit' | 'offset' | 'totalCount'
  > & {
    data: Array<
      Pick<ChatMessage, 'id' | 'message' | 'createdAt'> & {
        user: Pick<User, 'avatarUrl' | 'displayName' | 'username'>
      }
    >
  }
}

export type UserProfileQueryVariables = Exact<{ [key: string]: never }>

export type UserProfileQuery = {
  profile: Pick<UserProfileType, 'username' | 'avatarUrl' | 'displayName'>
}

export const CreateChatMessageDocument = gql`
  mutation CreateChatMessage($dto: CreateChatMessageDTO!) {
    createChatMessage(dto: $dto) {
      __typename
      ... on SuccessfulCreatedType {
        id
      }
      ... on InputErrorType {
        validationErrors {
          path
          message
        }
      }
    }
  }
`
export type CreateChatMessageMutationFn = Apollo.MutationFunction<
  CreateChatMessageMutation,
  CreateChatMessageMutationVariables
>

/**
 * __useCreateChatMessageMutation__
 *
 * To run a mutation, you first call `useCreateChatMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChatMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChatMessageMutation, { data, loading, error }] = useCreateChatMessageMutation({
 *   variables: {
 *      dto: // value for 'dto'
 *   },
 * });
 */
export function useCreateChatMessageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateChatMessageMutation,
    CreateChatMessageMutationVariables
  >,
) {
  return Apollo.useMutation<
    CreateChatMessageMutation,
    CreateChatMessageMutationVariables
  >(CreateChatMessageDocument, baseOptions)
}
export type CreateChatMessageMutationHookResult = ReturnType<
  typeof useCreateChatMessageMutation
>
export type CreateChatMessageMutationResult = Apollo.MutationResult<
  CreateChatMessageMutation
>
export type CreateChatMessageMutationOptions = Apollo.BaseMutationOptions<
  CreateChatMessageMutation,
  CreateChatMessageMutationVariables
>
export const ChatMessagesDocument = gql`
  query ChatMessages($dto: PaginationDTO!) {
    chatMessages(dto: $dto) {
      limit
      offset
      totalCount
      data {
        id
        message
        user {
          avatarUrl
          displayName
          username
        }
        createdAt
      }
    }
  }
`

/**
 * __useChatMessagesQuery__
 *
 * To run a query within a React component, call `useChatMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useChatMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatMessagesQuery({
 *   variables: {
 *      dto: // value for 'dto'
 *   },
 * });
 */
export function useChatMessagesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ChatMessagesQuery,
    ChatMessagesQueryVariables
  >,
) {
  return Apollo.useQuery<ChatMessagesQuery, ChatMessagesQueryVariables>(
    ChatMessagesDocument,
    baseOptions,
  )
}
export function useChatMessagesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ChatMessagesQuery,
    ChatMessagesQueryVariables
  >,
) {
  return Apollo.useLazyQuery<ChatMessagesQuery, ChatMessagesQueryVariables>(
    ChatMessagesDocument,
    baseOptions,
  )
}
export type ChatMessagesQueryHookResult = ReturnType<
  typeof useChatMessagesQuery
>
export type ChatMessagesLazyQueryHookResult = ReturnType<
  typeof useChatMessagesLazyQuery
>
export type ChatMessagesQueryResult = Apollo.QueryResult<
  ChatMessagesQuery,
  ChatMessagesQueryVariables
>
export const DashboardDocument = gql`
  query Dashboard {
    profile {
      username
      avatarUrl
      displayName
    }
    prefetchChatMessages: chatMessages(dto: { offset: 0, limit: 4 }) {
      limit
      offset
      totalCount
      data {
        id
        message
        user {
          avatarUrl
          displayName
          username
        }
        createdAt
      }
    }
  }
`

/**
 * __useDashboardQuery__
 *
 * To run a query within a React component, call `useDashboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardQuery({
 *   variables: {
 *   },
 * });
 */
export function useDashboardQuery(
  baseOptions?: Apollo.QueryHookOptions<
    DashboardQuery,
    DashboardQueryVariables
  >,
) {
  return Apollo.useQuery<DashboardQuery, DashboardQueryVariables>(
    DashboardDocument,
    baseOptions,
  )
}
export function useDashboardLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    DashboardQuery,
    DashboardQueryVariables
  >,
) {
  return Apollo.useLazyQuery<DashboardQuery, DashboardQueryVariables>(
    DashboardDocument,
    baseOptions,
  )
}
export type DashboardQueryHookResult = ReturnType<typeof useDashboardQuery>
export type DashboardLazyQueryHookResult = ReturnType<
  typeof useDashboardLazyQuery
>
export type DashboardQueryResult = Apollo.QueryResult<
  DashboardQuery,
  DashboardQueryVariables
>
export const UserProfileDocument = gql`
  query UserProfile {
    profile {
      username
      avatarUrl
      displayName
    }
  }
`

/**
 * __useUserProfileQuery__
 *
 * To run a query within a React component, call `useUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserProfileQuery(
  baseOptions?: Apollo.QueryHookOptions<
    UserProfileQuery,
    UserProfileQueryVariables
  >,
) {
  return Apollo.useQuery<UserProfileQuery, UserProfileQueryVariables>(
    UserProfileDocument,
    baseOptions,
  )
}
export function useUserProfileLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserProfileQuery,
    UserProfileQueryVariables
  >,
) {
  return Apollo.useLazyQuery<UserProfileQuery, UserProfileQueryVariables>(
    UserProfileDocument,
    baseOptions,
  )
}
export type UserProfileQueryHookResult = ReturnType<typeof useUserProfileQuery>
export type UserProfileLazyQueryHookResult = ReturnType<
  typeof useUserProfileLazyQuery
>
export type UserProfileQueryResult = Apollo.QueryResult<
  UserProfileQuery,
  UserProfileQueryVariables
>
