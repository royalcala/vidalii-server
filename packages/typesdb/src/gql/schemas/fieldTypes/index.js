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
        graphql: 'update on schema.get',
        knex: 'update on schema.get'
    }
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
    schema,
    field,
    // suscription = null // add to schema suscription when delete search 
}) => type({
    types: types.ref,
    ref: {
        schema,
        field
    }

})
// export const ref = type({
//     types: null,//get from schema 
// })

// export const virtual = typeName => type({
//     types: {
//         virtual: true,
//         ...types[typeName]
//     }
// })