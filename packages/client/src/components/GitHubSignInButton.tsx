import React from 'react'

import { Button } from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub'

import config from '~config'

import Link from './common/Link'

function GitHubSignInButton(): JSX.Element {
  return (
    <Button
      variant="contained"
      color="secondary"
      component={Link}
      size="large"
      href={`${config.API_URL}/auth/github/login`}
      underline="none"
      startIcon={<GitHubIcon />}
      fullwidth
    >
      Sign in with GitHub
    </Button>
  )
}

export default GitHubSignInButton
