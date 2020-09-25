import React from 'react'

import { Typography, makeStyles, Box } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  title: {
    fontWeight: 900,
  },
  subtitle: {
    fontWeight: 700,
  },
}))

function Header(): JSX.Element {
  const classes = useStyles()

  return (
    <Box display="flex" flexDirection="column" textAlign="center">
      <Typography
        variant="h1"
        component="h1"
        color="primary"
        className={classes.title}
      >
        Taurus
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        color="secondary"
        className={classes.subtitle}
      >
        The definitive modern stack to build your web projects 🛠
      </Typography>
    </Box>
  )
}

export default Header
