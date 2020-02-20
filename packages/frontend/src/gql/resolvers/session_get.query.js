import gql from 'graphql-tag'
import { SESSION_GET } from 'gql/actions'
export default (parent, args, { client, cache }) => {    
    // console.log('client.Query.session_get.CONTEXT**', context)
    // console.log('cache', Object.getPrototypeOf(context.cache))
    // console.log('client', Object.getPrototypeOf(context.client))
    // console.log('typeof cache.writeData', typeof context.cache.writeData)
    // console.log('typeof client.writeData', typeof context.client.writeData)
    try {
        let data = cache.readQuery({
            query: SESSION_GET
        })
        // console.log('data*****', data.session_get)
        return data.session_get
        // return {
        //     __typename: 'Session',
        //     id: 1,//is the token 
        //     token: null,
        //     username: 'que pex from resolver.Query.session_get'
        // }
    } catch (error) {
        console.log('session_get.query.error:', error)
        return {
            username: null,
            token: null
        }
    }

}