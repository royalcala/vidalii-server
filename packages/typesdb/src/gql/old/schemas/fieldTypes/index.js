import type from './type'
const types = {
    int: {
        graphql: 'Int',
        knex: 'integer',
        typeorm:'integer'
    },
    string: {
        graphql: 'String',
        knex: 'string',
        typeorm:'varchar'
    },
    uuid: {
        graphql: 'ID',
        knex: 'uuid',
        typeorm:'varchar'
    },
    ref: {
        graphql: 'is a ref get from oSchema.get() when is needed',
        knex: 'is a ref get from oSchema.get() when is needed'
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
export const relation = {
    one_to_one: 'one_to_one',
    one_to_many: 'one_to_many'
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
    relation = relation.one_to_many,
    // suscription = null // add to schema suscription when delete search 
}) => type({
    types: types.ref,
    ref: {
        schemaName,
        fieldName,
        relation
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