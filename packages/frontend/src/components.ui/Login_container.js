import React from "react";
import Box from "./Box";
import Login_byUsername from './Login_byUsername'
import Login_footer from './Login_footer'
const style = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
}
const styleHeader = {
    height: '10%',
}

const boxFooter = {
}
const Login = props => {
    console.log('Render Login Container')
    return (
        <Box {...style}>
            <Box {...styleHeader}>Header</Box>
            <Login_byUsername />
            <Box {...boxFooter}>footer</Box>
        </Box>
    )
    // return <>
    //     <button onClick={() => {
    //         setSession(true)
    //     }}>setSession(true)</button>
    //     <hr />
    //     <button onClick={() => {
    //         setState(state + 1)
    //     }}>ReRender</button>
    //     <div>Login Portal yeah!{state}</div>
    // </>
}

export default Login

 // xs={{
        //     border: 0,
        //     mt: 4,
        //     m: "auto",
        //     width: "90%"
        //     // ml: "30%",
        //     // mr: "33%"
        // }}
        // sm={{
        //     border: 1,
        //     borderColor: "grey.300",
        //     borderRadius: "borderRadius",
        //     m: "auto",
        //     width: "50%",
        //     // pt: "10%"
        //     // mt: 4,
        //     // ml: "30%",
        //     // mr: "33%"
        // }}
        // md={{
        //     border: 1,
        //     borderColor: "grey.300",
        //     borderRadius: "borderRadius",
        //     m: "auto",
        //     width: "50%",
        //     // pt: "10%"
        //     // mt: 4,
        //     // ml: "30%",
        //     // mr: "33%"
        // }}

        // borderColor="primary.main"
        // borderColor={["grey.500","grey.500","grey.500"]}
        // borderRadius="borderRadius"
        // border={[0,1,1]}

        //winner this way
        // fontSize={{ xs: 'h1.fontSize', sm: 'h4.fontSize', md: 'h3.fontSize' }}

        // fontSize={100}
        // fontSize={[100, 50, 1]}
        // border={{ xs: 0, sm: 5, md: 10 }}
        //doesnt native implemented for work
        // xs={{ fontSize: 'h1.fontSize' }}
        // xs={{ fontSize: 200, }}
        // sm={{ fontSize: 150,}}
        // md={{ fontSize: 100 }}
        // lg={{ fontSize: 50 }}
        // xl={{ fontSize: 10 }}
        // mt={4}
        // ml="30%"
        // mr="33%"