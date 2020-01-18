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

export const ref = type({
    types: types.string,
})

// export const virtual = typeName => type({
//     types: {
//         virtual: true,
//         ...types[typeName]
//     }
// })