import React from 'react'

import { Box, Divider } from '@material-ui/core'

import { useStoreState, useStoreActions } from '~store'

import ChatMessages from '~components/ChatMessages'
import DashboardSkeleton from '~components/DashboardSkeleton'
import GitHubSignInButton from '~components/GitHubSignInButton'
import SendChatMessage from '~components/SendChatMessage'
import UserHero from '~components/UserHero'
import { useDashboardLazyQuery } from '~generated/graphql-hooks'

function Dashboard(): JSX.Element {
  const [didInitialLoad, setDidInitialLoad] = React.useState<boolean>(false)

  const userActions = useStoreActions(actions => actions.user)
  const { isAuthenticated } = useStoreState(state => state.auth)

  const [
    initialQuery,
    {
      loading: initialQueryLoading,
      error: initialQueryError,
      data: initialQueryData,
    },
  ] = useDashboardLazyQuery({
    fetchPolicy: 'cache-first',
  })

  React.useEffect(() => {
    if (didInitialLoad === false && isAuthenticated) {
      initialQuery()
    }
  }, [didInitialLoad, isAuthenticated, initialQuery])

  React.useEffect(() => {
    if (didInitialLoad === false && !initialQueryLoading) {
      if (initialQueryError) {
        console.error(initialQueryError)
        alert('An unexpected error ocurred')
      } else {
        if (initialQueryData) {
          const { profile } = initialQueryData!

          userActions.setProfile(profile)
          setDidInitialLoad(true)
        }
      }
    }
  }, [
    didInitialLoad,
    userActions,
    initialQueryLoading,
    initialQueryError,
    initialQueryData,
  ])

  if (!isAuthenticated) {
    return <GitHubSignInButton />
  }

  if (didInitialLoad === false) {
    return <DashboardSkeleton />
  }

  return (
    <Box display="flex" flexDirection="column">
      <UserHero />

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        flexShrink={0}
        mt={1}
      >
        <SendChatMessage />
      </Box>

      <Box my={3}>
        <Divider variant="fullWidth" />
      </Box>

      <ChatMessages />
    </Box>
  )
}

export default Dashboard
