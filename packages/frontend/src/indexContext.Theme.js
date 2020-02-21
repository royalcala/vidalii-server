import React from 'react';
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

export default function Theme(props) {
    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    )
}