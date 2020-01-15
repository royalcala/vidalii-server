import { assocPath } from 'ramda'
const SEPARATOR = '_'
const addResolverForSearchInSubtable = ({ oGraphql, nextNameType, db }) => {
    oGraphql.resolvers.types.push(
        assocPath(nextNameType.split(SEPARATOR),
            async (parent, args = {}, context, info) => {
                //parent.parent_id
                let concatQuery = db  
                concatQuery = concatQuery.where({ parent_id: parent._id })
                Object.entries(args).forEach(
                    ([operator, values]) => {
                        concatQuery = concatQuery[operator](...values)
                    })
                let results = await concatQuery.select('*').from(tableName)
                return results
            }, {})
    )
}

const addResolverForSearchInTable = ({ oGraphql, nameType, db }) => {
    oGraphql.queries.push({
        sdl: `${nameType}:[${nameType}]`
    })
    oGraphql.resolvers.queries.push({
        [nameType]: async (parent, args = {}, context, info) => {
            let query = db
            Object.entries(args).forEach(
                ([operator, values]) => {
                    query = query[operator](...values)
                })
            let results = await query.select('*').from(tableName)
            return results

        }
    })
}
const addFieldToType = ({ oGraphql, nameType, nameField, typeField }) => {
    if (!oGraphql.types.hasOwnProperty(nameType))
        oGraphql.types[nameType] = []

    oGraphql.types[nameType].push({
        nameField,
        typeField
    })

}

const iterateSchema = ({ nameType, schema, oGraphql, db }) => {
    addResolverForSearchInTable({ oGraphql, nameType, db })
    let key
    for (key in schema) {
        if (schema[key].hasOwnProperty('vidaliiLeaf')) {
            addFieldToType({
                oGraphql,
                nameType,
                nameField: key,
                typeField: schema[key].types.graphql
            })
        } else if (typeof schema[key] === 'object') {
            let nextNameType = `${nameType}${SEPARATOR}${key}`
            addFieldToType({
                oGraphql,
                nameType: nextNameType,
                nameField: key,
                typeField: `[${nextNameType}]`
            })
            addResolverForSearchInSubtable({ oGraphql, nextNameType, db })

            iterateSchema({
                nameType: `${nextNameType}`,
                schema: schema[key],
                oGraphql
            })
        }
    }
}

export default ({ name, schema, db }) => {
    let oGraphql = {
        types: {},
        queries: [],
        mutations: [{
            sdl: `${name}:${name}`
        }],
        resolvers: {
            types: [],
            queries: [],
            mutations: [{
                [name]: obj => {
                    //function mutations one For all the schema
                }
            }]
        }
    }
    iterateSchema({ nameType: name, schema, oGraphql, db })
    console.log('oGraphql::', oGraphql)
    console.log('oGraphql.resolvers.types::', oGraphql.resolvers.types)

    // let test = db.where({parent_id:1}).where({a:1}).toString()
    // console.log('test::',test)
    // console.log('resultTypesObject::', resultTypesObject)
    // let resultTypesString = typesString(resultTypesObject)
    // console.log('resultTypesString::', resultTypesString)
    // console.log('1::', gql(sdlTypes).definitions[0])
    // return {
    //     obj: resultTypesObject,
    //     string: resultTypesString
    // }

}