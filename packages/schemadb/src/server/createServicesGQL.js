import { assocPath } from 'ramda'
const SEPARATOR = '_'
const queryResolver = () => {

}

const resolveSchema = ({ nameType, schema, oGraphql }) => {

    oGraphql.queries.push({
        sdl: `${nameType}:[${nameType}]`
    })
    // oGraphql.mutations.push({
    //     sdl: `${nameType}:[${nameType}]`
    // })
    oGraphql.resolvers.queries.push({
        [nameType]: () => {
            //db
        }
    })
    // oGraphql.resolvers.mutations.push({
    //     [nameType]: () => {
    //         //db, this only once, the schema do all
    //         //remove from here
    //     }
    // })

    oGraphql.types[nameType] = []
    let key
    for (key in schema) {
        if (schema[key].hasOwnProperty('vidaliiLeaf')) {
            oGraphql.types[nameType].push({
                name: key,
                type: schema[key].types.graphql
            })
        } else if (typeof schema[key] === 'object') {
            let nextNameType = `${nameType}${SEPARATOR}${key}`
            oGraphql.types[nameType].push({
                name: key,
                type: `[${nextNameType}]`
            })
            oGraphql.resolvers.types.push(
                assocPath(nextNameType.split(SEPARATOR), queryResolver, {})
            )
            resolveSchema({
                nameType: `${nextNameType}`,
                schema: schema[key],
                oGraphql
            })
        }
    }


}

export default ({ name, schema }) => {
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
                [name]: () => {
                    //function mutation of schemadb
                }
            }]
        }
    }
    resolveSchema({ nameType: name, schema, oGraphql })
    console.log('oGraphql::', oGraphql)
    console.log('oGraphql.resolvers.types::', oGraphql.resolvers.types)
    // console.log('resultTypesObject::', resultTypesObject)
    // let resultTypesString = typesString(resultTypesObject)
    // console.log('resultTypesString::', resultTypesString)
    // console.log('1::', gql(sdlTypes).definitions[0])
    // return {
    //     obj: resultTypesObject,
    //     string: resultTypesString
    // }

}