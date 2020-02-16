export default () => {
    console.log('Access to query_session_get')

    return {
        __typename: 'Session',
        token: null,
        username: 'Roy Alcala'
    }
}