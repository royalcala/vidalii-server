export default (...data) => {
    console.log('client.Query.session_get', data)

    return {
        __typename: 'Session',
        id: 1,//is the token 
        token: null,
        username: 'from resolver.Query.session_get'
    }
}