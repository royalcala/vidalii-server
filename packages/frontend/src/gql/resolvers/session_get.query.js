export default (...data) => {
    console.log('Resolver Query.session_get', data)

    return {
        __typename: 'Session',
        token: 'null',
        username: 'from resolver.Query.session_get'
    }
}