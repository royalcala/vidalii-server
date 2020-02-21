import React from 'react'
import { Route, Switch } from "react-router-dom";
import Box from 'ui/Box'
import ByUsername from 'ui/Login.ByUsername'
import Recovery from 'ui/Login.Recovery'
import Footer from 'ui/Login.Footer'
const Body = props => {
    const style = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    }
    return <Box {...style}>{props.children}</Box>

}
const Header = props => <Box height="10%" >{props.children}</Box>
const Content = props => {
    const style = {
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
    return <Box {...style}>{props.children}</Box>
}
// const Recover = () => <div>Recover</div>
const Login = props => {
    console.log('Render Login')
    return (
        <Body>
            <Header />
            <Content>
                <Switch>
                    <Route exact path="/" component={ByUsername} />
                    <Route path="/recovery" component={Recovery} />
                    {/* <Route path="/contact" component={Contact} /> */}
                </Switch>
            </Content>
            <Footer />
        </Body>
    )
}

export default Login