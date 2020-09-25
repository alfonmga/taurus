import React from 'react'

import {
  Avatar,
  Box,
  Typography,
  useTheme,
  makeStyles,
} from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import GitHubIcon from '@material-ui/icons/GitHub'

import Link from '~components/common/Link'

const useStyles = makeStyles(theme => ({
  chatMessageContainer: {
    '&:not(:last-child)': {
      marginBottom: theme.spacing(1.5),
    },
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  userInfoWrap: {
    margin: theme.spacing(0, 1, 0, 0.5),
  },
  githubLink: {
    display: 'flex',
    flexDirection: 'row',
  },
  githubIcon: {
    color: theme.palette.text.secondary,
    marginRight: '5px',
  },
  textMessageWrap: {
    padding: theme.spacing(1, 1, 1, 1),
    borderRadius: '30px',
    color: theme.palette.common.white,
  },
  textMessage: {
    fontWeight: 800,
    wordBreak: 'break-all',
  },
}))

function ChatMessage({
  avatarUrl,
  username,
  displayName,
  message,
  me,
}: {
  avatarUrl: string
  username: string
  displayName: string
  message: string
  me: boolean
}): JSX.Element {
  const classes = useStyles()
  const theme = useTheme()

  const shortDisplayName = (displayName: string): string =>
    displayName.split(' ')[0]

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      flexShrink={0}
      className={classes.chatMessageContainer}
    >
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        maxWidth="180px"
        flexShrink={0}
        style={{
          order: me ? 2 : 0,
          paddingLeft: me ? theme.spacing(0.25) : undefined,
          paddingRight: !me ? theme.spacing(0.25) : undefined,
        }}
      >
        <Avatar
          alt={displayName}
          src={avatarUrl}
          className={classes.avatar}
          style={{
            order: me ? 2 : 0,
          }}
        />
        <Box
          display="flex"
          flexDirection="column"
          className={classes.userInfoWrap}
          style={{ order: 1 }}
        >
          <Typography variant="h6">{shortDisplayName(displayName)}</Typography>
          <Link
            href={`https://github.com/${username}`}
            underline="none"
            target="_new"
            className={classes.githubLink}
          >
            <GitHubIcon fontSize="small" className={classes.githubIcon} />
            <Typography variant="subtitle2" color="textSecondary">
              {username}
            </Typography>
          </Link>
        </Box>
      </Box>

      <Box
        className={classes.textMessageWrap}
        style={{
          order: 1,
          marginLeft: me ? 'auto' : undefined,
          backgroundColor: me ? green.A400 : theme.palette.primary.main,
          borderBottomRightRadius: me ? '5px' : undefined,
        }}
      >
        <Typography
          variant="body1"
          color="inherit"
          className={classes.textMessage}
        >
          {message}
        </Typography>
      </Box>
    </Box>
  )
}

export default ChatMessage
