import React from 'react'

import { Box, Divider, makeStyles, useTheme } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'

const useStyles = makeStyles(theme => ({
  logoutBtn: {
    marginTop: '16px',
    marginLeft: 'auto',
  },
  displayName: {
    marginTop: '6px',
  },
  sendChatMessageButton: {
    marginTop: '16px',
  },
  chatMessages: {},
  divider: {
    marginTop: theme.spacing(4.5),
    marginBottom: theme.spacing(2.5),
  },
}))

function ChatMessageSkeleton({
  position,
}: {
  position: 'left' | 'right'
}): JSX.Element {
  const theme = useTheme()

  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <Skeleton
        variant="circle"
        width={theme.spacing(5)}
        height={theme.spacing(5)}
        style={{
          minWidth: theme.spacing(5),
          order: position === 'left' ? 0 : 2,
        }}
      />
      <Box
        display="flex"
        flexDirection="column"
        mx={2.25}
        width="100%"
        style={{ order: 1 }}
      >
        <Skeleton
          variant="text"
          style={{ paddingLeft: position === 'right' ? 'auto' : undefined }}
          height={30}
        />
        <Skeleton
          variant="text"
          style={{ paddingLeft: position === 'right' ? 'auto' : undefined }}
          height={30}
        />
      </Box>
    </Box>
  )
}

function DashboardSkeleton(): JSX.Element {
  const classes = useStyles()

  return (
    <Box display="flex" flexDirection="column">
      <Skeleton
        variant="rect"
        width={90.19}
        height={16}
        className={classes.logoutBtn}
      />

      <Box display="flex" flexDirection="column" alignItems="center">
        <Skeleton variant="circle" width={84} height={84} />
        <Skeleton
          variant="text"
          width={170}
          height={32}
          className={classes.displayName}
        />

        <Skeleton
          variant="rect"
          width={314}
          height={56}
          className={classes.sendChatMessageButton}
        />
      </Box>

      <Divider variant="fullWidth" className={classes.divider} />

      <ChatMessageSkeleton position="left" />
      <ChatMessageSkeleton position="right" />
    </Box>
  )
}

export default DashboardSkeleton
