import React from 'react';
// import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { cache, client } from '../../App'

const readQueryStateNested = () => {
    // console.clear()
    try {
        const getState = gql`
                query  {
                    stateNested @client {
                        _id
                       name                 
                    }
                }
            `;
        let data = client.readQuery({ query: getState })
        console.log(data)
    } catch (error) {
        console.log('error::', error)
    }
};
const queryState = gql`
query  {
    state @client {
        _id
       name                
    }
}
`
const readQueryState = () => {
    // console.clear()
    try {
        const getState = gql`
                query queryState {
                    state @client {
                        _id
                       name                                        
                    }
                }
            `;
        let data = client.readQuery({ query: queryState })
        console.log(data)
        return data
    } catch (error) {
        console.log('error::', error)
        return []
    }
};
let contQuery = 100
const writeQuery = () => {
    contQuery++
    let { state = [] } = readQueryState()
    try {
        const newOne = {
            _id: contQuery,
            name: 'Im state',
            __typename: 'state',
        };
        state.push(newOne)
        let response = client.writeQuery({
            query: queryState,
            data: { state }
        });
        console.log('writeQuery finished')
    } catch (error) {
        console.log('error::', error)
    }

}

let cont = 0
const writeData = () => {
    console.clear()
    cont++

    try {
        //ROOT_QUERY
        client.writeData({
            data: {
                state: [{
                    _id: 1,
                    name: 'Im state One ',
                    __typename: 'state',
                }]
            }
        })
        client.writeData({
            data: {
                state: [{
                    _id: 2,
                    name: 'Im state Two ',
                    __typename: 'state',
                }]
            }
        })
        //connection in ROOT_QUERY
        client.writeData({
            data: {
                state: [{
                    _id: 2,
                    __typename: 'state',
                },
                {
                    _id: 1,
                    __typename: 'state',
                }]
            }
        })
        //udpate object
        // client.writeData({
        //     id: 'state:1',
        //     data: {
        //         name: 'Im state updated ',
        //         __typename: 'state',
        //     }
        // })

        // client.writeData({
        //     id: 'state:2',
        //     data: {
        //         name: 'Im state updated ',
        //         __typename: 'state',
        //     }
        // })

        // client.writeData({
        //     data: {
        //         _id: 2,
        //         name: 'Im state ',
        //         __typename: 'state',
        //     }

        // });
        // client.writeData({
        //     data: {
        //         stateNested: {
        //             _id: 1,
        //             name: 'Im statedNested ',
        //             otherValue: 'here',
        //             __typename: 'stateNested'
        //         }
        //     }
        // });
        //connection
        // client.writeData({
        //     data: {
        //         state: {
        //             _id: 1,
        //             __typename: 'state',
        //             stateNested: {
        //                 _id: 1,
        //                 __typename: 'stateNested',
        //             }
        //         }
        //     }
        // });

    } catch (error) {
        console.log('error::', error)
    }
}
export default () => {

    return (
        <>
            {/* <button onClick={read_ROOT_QUERY}>read_ROOT_QUERY</button> */}
            Read:
            <button onClick={readQueryStateNested}>readQueryStateNested</button>
            <button onClick={readQueryState}>readQueryState</button>

            <hr />
            Write:
            <button onClick={writeData}>writeData</button>
            <button onClick={writeQuery}>writeQuery</button>
        </>
    )
}