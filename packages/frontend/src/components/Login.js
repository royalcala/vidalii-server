import React from "react";
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
const Login = node => {
    console.log('Render Login')
    const { setSession } = node.parentProps
    const [state, setState] = React.useState(0)
    return (
        <Box
            // borderColor="primary.main"
            borderColor="grey.500"
            borderRadius="borderRadius"
            border={1}
            //winner this way
            // fontSize={{ xs: 'h1.fontSize', sm: 'h4.fontSize', md: 'h3.fontSize' }}

            // fontSize={100}
            // fontSize={[100, 50, 1]}
            // p={{ xs: 1, sm: 10, md: 50 }}
            //doesnt native implemented for work
            // xs={{ fontSize: 'h1.fontSize' }}
        // sm={{ fontSize: 18 }}
        // md={{ fontSize: 24 }}
        // mt={4}
        // ml="30%"
        // mr="33%"
        >
            login
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