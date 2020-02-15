import React from 'react'
import { Route, Switch } from "react-router-dom";
import Box from 'ui/Box'
import Login_container from 'ui/Login_container'
import Login_footer from 'ui/Login_footer'
import Login_byUsername from 'ui/Login_byUsername'

const Login = props => {
    console.log('Render Login',window.location.href,window.location.pathname)
    return (
        <Login_container>
            <Box height="10%" />
            <Switch>
                <Route exact path="/" component={Login_byUsername} />
                {/* <Route path="/portfolio/:id" component={Portfolio} />
                <Route path="/contact" component={Contact} /> */}
            </Switch>
            <Login_footer />
        </Login_container>
    )
}

export default Login