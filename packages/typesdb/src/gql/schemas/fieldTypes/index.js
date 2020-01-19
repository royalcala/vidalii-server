import type from './type'
const types = {
    int: {
        graphql: 'Int',
        knex: 'integer'
    },
    string: {
        graphql: 'String',
        knex: 'string'
    },
    uuid: {
        graphql: 'ID',
        knex: 'uuid'
    },
    ref: {
        graphql: 'get from ref to oSchema.get() when is needed',
        knex: 'get from ref to oSchema.get() when is needed'
    },
    // type: {
    //     one_to_one: {
    //         graphql: 'update with a type',
    //         knex: ''
    //     },
    //     one_to_many: {
    //         graphql: 'update with a type',
    //         knex: ''
    //     }
    // }
}
export const getRefField = ({ schemas, ref }) => {
    // schemas[ref.schemaName].fields[ref.fieldName].types.knex
    return schemas[ref.schemaName].fields[ref.fieldName]
}

export const int = type({
    types: types.int,
})

export const string = type({
    types: types.string,
})

export const uuid = type({
    types: types.uuid,
})

export const ref = ({
    schemaName,
    fieldName,
    // suscription = null // add to schema suscription when delete search 
}) => type({
    types: types.ref,
    ref: {
        schemaName,
        fieldName
    }

})()


// export const ref = type({
//     types: null,//get from schema 
// })

// export const virtual = typeName => type({
//     types: {
//         virtual: true,
//         ...types[typeName]
//     }
// })