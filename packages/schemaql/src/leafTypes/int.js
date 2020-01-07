import leaf from '../leaf'

export default leaf({
    // type: 'Int',
    types: {
        graphql: 'Int',
        knex: 'integer'
    },
    validationType: ({ newValue }) => {
        // let parse = parseInt(newValue, 10)
        // if (isNaN(parse))
        //     return 0
        // else
        //     return parse
        //the validation occurs in sql engine
        return newValue
    }
})