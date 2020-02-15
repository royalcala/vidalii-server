import React from 'react';
import {
  createMuiTheme,
  ThemeProvider
} from "@material-ui/core/styles";
import Admin from './Dynamic/store/Admin'
import Session from './Dynamic/store/Vidalii/Session'

const theme = createMuiTheme({
  //custom mui here, this merge the default with this custom
  // palette: {
  //   primary: {
  //     light: '#0d0d0e',
  //     main: '#0d0d0e',
  //     dark: '#0d0d0e'
  //   }
  // }
})

export default () => {
  console.log('session:', Session.propTypes)
  return (
    <ThemeProvider theme={theme}>
      {/* <Admin /> */}
      <Session user={{ name: 'Rao', email: 'My@email.com' }} />
    </ThemeProvider>
  )
}