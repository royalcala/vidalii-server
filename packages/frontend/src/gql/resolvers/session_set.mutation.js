// import { SESSION_SET } from 'gql/actions'
// import { client } from 'IndexContext'

export default async (parent, args) => {
    console.log('resolver session_set')
    console.log('%c⧭', 'color: #bfffc8', args);
    const { username, password } = args
    // client.mutate(SESSION_SET, { username, password })
    return {
        // __typename: 'Session',
        token: 'correct your session',
        username: 'Roy Alcala'
    }
}