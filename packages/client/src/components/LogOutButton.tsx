import React from 'react'

import { Button, makeStyles, CircularProgress } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import { useStoreActions } from '~store'

const useStyles = makeStyles(() => ({
  root: {
    marginLeft: 'auto',
  },
}))

function LogOutButton(): JSX.Element {
  const classes = useStyles()
  const logOutAction = useStoreActions(actions => actions.auth.logOut)
  const [loading, setLoading] = React.useState(false)

  const onClick = async () => {
    setLoading(true)

    try {
      await logOutAction()
    } catch (e) {
      alert(e.message)
    }

    setLoading(false)
  }

  return (
    <Button
      color="secondary"
      size="large"
      startIcon={!loading ? <ExitToAppIcon /> : undefined}
      className={classes.root}
      onClick={onClick}
      disabled={loading}
    >
      {loading && <CircularProgress size={14} />}
      {!loading && 'LOG OUT'}
    </Button>
  )
}

export default LogOutButton
