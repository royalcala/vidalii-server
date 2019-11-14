import { cond, reduce, assoc, toPairs, } from 'ramda'
import typedb_inStorage from './db.storage.inStorage'
import typedb_inMemory from './db.storage.inMemory'
import { evolCompose } from '@vidalii/evol'




// const reduce_tables_assoc = globalData => assoc_cond =>
//     reduce(
//         assoc_cond,
//         {}
//     )(toPairs(globalData.config.tables))

// const assoc_cond = cond_typedb => (acc, [tableName, tableConfig]) =>
//     assoc
//         (
//             tableName,
//             cond_typedb({ tableName, tableConfig }),
//             acc
//         )

// const cond_typedb = () => assoc_cond_args => cond([
//     typedb_inStorage,
//     typedb_inMemory
// ])(assoc_cond_args)





// export default globalData => compose(
//     reduce_tables_assoc(globalData),
//     assoc_cond,
//     cond_typedb,
// )(null)

const reduce_tables_assoc = ({ parent, assoc_cond }) =>
    reduce(
        assoc_cond,
        {}
    )(toPairs(parent.config.tables))

const assoc_cond = ({ cond_typedb }) =>
    (acc, [tableName, tableConfig]) =>
        assoc
            (
                tableName,
                cond_typedb({ tableName, tableConfig }),
                acc
            )

const cond_typedb = () => assoc_cond_args => cond([
    typedb_inStorage,
    typedb_inMemory
])(assoc_cond_args)

export default evolCompose(
    ['reduce_tables_assoc', reduce_tables_assoc],
    ['assoc_cond', assoc_cond],
    ['cond_typedb', cond_typedb],
)(children => children.reduce_tables_assoc)
