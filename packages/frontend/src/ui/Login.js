import React from 'react'
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Box from 'ui/Box'
import LoginContainer from 'ui/LoginContainer'
import LoginByUsername from 'ui/LoginByUsername'
import LoginFooter from 'ui/LoginFooter'

const Recover = () => <div>Recover</div>
const Login = props => {
    console.log('Render Login')
    return (
        <LoginContainer>
            <Box height="10%" />
            {/* <Router> */}
                <Switch>
                    <Route exact path="/" component={LoginByUsername} />
                    <Route path="/recovery" component={Recover} />
                    {/* <Route path="/contact" component={Contact} /> */}
                </Switch>
            {/* </Router> */}
            <LoginFooter />
        </LoginContainer>
    )
}

export default Login