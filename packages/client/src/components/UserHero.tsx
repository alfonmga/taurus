import React from 'react'

import { Avatar, Box, makeStyles, Typography } from '@material-ui/core'

import { useStoreState } from '~store'

import LogOutButton from '~components/LogOutButton'

const useStyles = makeStyles(theme => ({
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginBottom: theme.spacing(0.5),
  },
}))

function UserHero(): JSX.Element {
  const classes = useStyles()
  const { displayName, avatarUrl } = useStoreState(state => state.user.profile)

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      flexShrink={0}
    >
      <Box display="flex" flexDirection="column" width="100%" mb={0.75}>
        <LogOutButton />
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar alt={displayName} src={avatarUrl} className={classes.avatar} />
        <Typography variant="h5">
          Welcome{' '}
          <Typography
            variant="inherit"
            color="primary"
            style={{ fontWeight: 900 }}
          >
            {displayName}
          </Typography>
          !
        </Typography>
      </Box>
    </Box>
  )
}

export default UserHero
