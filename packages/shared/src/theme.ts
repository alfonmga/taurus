import { pink, grey, red } from '@material-ui/core/colors'
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

export const theme = responsiveFontSizes(
  createMuiTheme({
    spacing: 12,
    palette: {
      primary: pink,
      secondary: grey,
      error: {
        main: red.A400,
      },

      text: {
        primary: 'rgb(44, 52, 68)',
      },
      background: { default: '#FAFAFA' },
    },
    typography: {
      h1: {
        color: 'hsl(219,22%,22%)',
      },
      h2: {
        color: 'hsl(219,22%,22%)',
      },
      h3: {
        color: 'hsl(219,22%,22%)',
      },
      h4: {
        color: 'hsl(219,22%,22%)',
      },
      h5: {
        color: 'hsl(219,22%,22%)',
      },
      body1: {
        color: 'rgb(70, 78, 93)',
      },
      body2: {
        color: 'rgb(70, 78, 93)',
      },
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    props: {
      MuiCircularProgress: {
        thickness: 7,
      },
    },
  }),
)
