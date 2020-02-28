import leaf from '../leaf'

export default leaf({
    // type: 'String',
    types: {
        graphql: 'String',
        knex: 'string'
    },
    validationType: ({ newValue }) => newValue
})