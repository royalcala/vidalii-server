import typeClass from './types.class'
import { typeCast } from './types.cast'
export const relation = {
    one_to_one: 'one_to_one',
    one_to_many: 'one_to_many'
}
export const getRefField = ({ schemas, ref }) => {
    // schemas[ref.schemaName].fields[ref.fieldName].types.knex
    return schemas[ref.schemaName].fields[ref.fieldName]
}

export const int = typeClass({
    types: typeCast.int,
})

export const string = typeClass({
    types: typeCast.string,
})

export const uuid = typeClass({
    types: typeCast.uuid,
})

export const ref = ({
    schemaName,
    fieldName,
    relation = relation.one_to_many,
    // suscription = null // add to schema suscription when delete search 
}) => typeClass({
    types: typeCast.ref,
    ref: {
        schemaName,
        fieldName,
        relation
    }

})()


// export const ref = typeClass({
//     types: null,//get from schema 
// })

// export const virtual = typeName => typeClass({
//     types: {
//         virtual: true,
//         ...types[typeName]
//     }
// })