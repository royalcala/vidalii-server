import React from 'react'
import Link from '@material-ui/core/Link';
import { useApolloClient } from '@apollo/react-hooks';
// import { useHistory, Link } from "react-router-dom";
const CloseSession = props => {
    const client = useApolloClient()
    return <>
        <Link href="" onClick={() => {
            client.resetStore()
        }}>Close Session </Link>
    </>
}

export default CloseSession