import React from 'react';
import Admin from './Dynamic/store/Admin'
import {
  createMuiTheme,
  ThemeProvider
} from "@material-ui/core/styles";
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
  return (
    <ThemeProvider theme={theme}>
      <Admin />
    </ThemeProvider>
  )
}