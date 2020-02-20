import React from 'react'
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Box from 'ui/Box'
import LoginContainer from 'ui/LoginContainer'
import LoginByUsername from 'ui/LoginByUsername'
import LoginRecovery from 'ui/LoginRecovery'
import LoginFooter from 'ui/LoginFooter'

const container = {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-around',
    alignItems: 'center',
    border: 1,
    borderColor: "grey.300",
    borderRadius: 8,
    width: "25%",
    p: "3%"
    // xs: {
    // m: "auto",
    // pt: "10%"
    // mt: 4,
    // ml: "30%",
    // mr: "33%"
    // }
}
// const Recover = () => <div>Recover</div>
const Login = props => {
    console.log('Render Login')
    return (
        <LoginContainer>
            <Box height="10%" />
            <Box {...container}>
                {/* <Router> */}
                <Switch>
                    <Route exact path="/" component={LoginByUsername} />
                    <Route path="/recovery" component={LoginRecovery} />
                    {/* <Route path="/contact" component={Contact} /> */}
                </Switch>
                {/* </Router> */}
            </Box>
            <LoginFooter />
        </LoginContainer>
    )
}

export default Login