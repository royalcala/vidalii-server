import { assocPath } from 'ramda'
import { SEPARATOR } from '../../CONSTANTS'
import { searchInTable, searchInSubTable } from './resolversTables'

const addFieldToType = ({ oGraphql, nameType, nameField, typeField }) => {
    if (!oGraphql.types.hasOwnProperty(nameType))
        oGraphql.types[nameType] = []

    oGraphql.types[nameType].push({
        nameField,
        typeField
    })
}
const addFieldsNotSpefiedOnSchema = ({ oGraphql, nameType, type }) => {
    addFieldToType({
        oGraphql,
        nameType,
        nameField: '_id',
        typeField: 'ID'
    })
    if (type === 'extended')
        addFieldToType({
            oGraphql,
            nameType,
            nameField: 'parent_id',
            typeField: 'ID'
        })
}
const iterateSchema = ({ nameType, schema, oGraphql, db, type }) => {
    searchInTable({ oGraphql, nameType, db })
    addFieldsNotSpefiedOnSchema({ oGraphql, nameType, type })

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
                nameType,
                nameField: key,
                typeField: `[${nextNameType}]`
            })
            searchInSubTable({ oGraphql, nextNameType, db })

            iterateSchema({
                nameType: `${nextNameType}`,
                schema: schema[key],
                oGraphql,
                db,
                type: 'extended'
            })
        }
    }
}

export default ({ name, schema, db, mutation }) => {
    let oGraphql = {
        types: {},
        queries: [],
        mutations: [{
            sdl: `${name}(data:JSON!):${name}`
        }],
        resolvers: {
            types: [],
            queries: [],
            mutations: [{
                [name]: async (parent, input) => {
                    console.log('input.data::',input.data)
                    let result = await mutation(input.data)
                    console.log('result::', result)
                    return {
                        _id: 1,
                        folio: 12,
                        salesPerson: 'sales ROy'
                    }
                }
            }]
        }
    }
    iterateSchema({
        nameType: name,
        schema,
        oGraphql,
        db,
        type: 'root'
    })
    return oGraphql
}