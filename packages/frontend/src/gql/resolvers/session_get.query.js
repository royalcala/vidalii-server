export default (...data) => {
    console.log('Access to query_session_get', data)

    return {
        __typename: 'Session',
        token: 'null',
        username: 'roy alcala'
    }
}