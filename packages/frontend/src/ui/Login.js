import React from 'react'
import { Route, Switch } from "react-router-dom";
import Box from 'ui/Box'
import LoginContainer from 'ui/LoginContainer'
import LoginByUsername from 'ui/LoginByUsername'
import LoginFooter from 'ui/LoginFooter'


const Login = props => {
    console.log('Render Login')
    return (
        <LoginContainer>
            <Box height="10%" />
            <Switch>
                <Route exact path="/" component={LoginByUsername} />
                {/* <Route path="/portfolio/:id" component={Portfolio} />
                <Route path="/contact" component={Contact} /> */}
            </Switch>
            <LoginFooter />
        </LoginContainer>
    )
}

export default Login