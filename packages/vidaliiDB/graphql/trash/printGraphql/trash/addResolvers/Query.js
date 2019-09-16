const R = require('ramda')


/// for print the resolvers we need to define a new function that print all the
/// resolver functions in string 
module.exports = ({ schemas, models }) => {
    return R.pipe(
        R.toPairs,
        R.reduce((acc, [nameSchema, value]) => R.assoc(
            nameSchema,
            (parent, args, context, info) => {
                const { query = null } = args
                let toJson = query !== null ? JSON.parse(query) : null
                // console.log('query to object query.selector::', args)
                // return { username: 'je' }
                // console.log('models::', nameSchema, models[nameSchema])
                return models[nameSchema].find(toJson)
            },
            acc),
            {}),
    )(schemas)
}