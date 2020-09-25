import React from 'react'

import { Box, makeStyles, Paper } from '@material-ui/core'
import dynamic from 'next/dynamic'

import Footer from '~components/Footer'
import Header from '~components/Header'

const Dashboard = dynamic(() => import('~components/Dashboard'), {
  ssr: false,
})

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    width: '100vw',
    margin: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: undefined,
    [theme.breakpoints.up('xl')]: {
      justifyContent: 'center',
      margin: theme.spacing(2, 0, 2, 0),
    },
  },
  paper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    flexGrow: 1,
    borderRadius: 0,
    padding: theme.spacing(1.5, 1, 1.5, 1),
    [theme.breakpoints.up('xl')]: {
      height: 'auto',
      flexGrow: 0,
      maxWidth: '1280px',
      borderRadius: '30px',
      padding: theme.spacing(3, 2.5, 3, 2.5),
    },
  },
  footer: {
    [theme.breakpoints.down('lg')]: {
      display: 'none',
    },
  },
}))

export default function Index(): JSX.Element {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.paper}>
        <Box mb={5}>
          <Header />
        </Box>
        <Dashboard />
      </Paper>
      <Box mt={1.5} className={classes.footer}>
        <Footer />
      </Box>
    </div>
  )
}
