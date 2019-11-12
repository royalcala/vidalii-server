import { toPairs, reduce, assoc, ifElse, has } from 'ramda'
import newFxs from './db.crud.tac.newFxs'
import { evolCompose } from '@vidalii/evol'

const mergeInDB = ({ init_db, reduce_dbs_assoc }) => {
    for (var i in init_db) {
        // console.log(i)        
        init_db[i].tac = reduce_dbs_assoc[i]
    }
    return init_db
}

const reduce_dbs_assoc = ({ init_db, assoc_newFxs }) => reduce(
    assoc_newFxs,
    {}
)(toPairs(init_db))

const assoc_newFxs = ({ newFxs, encoders }) => (acc, [nameTable, valueTable]) => assoc(
    nameTable,
    newFxs({
        nameTable, valueTable, encoder: ifElse(
            has(nameTable),
            () => encoders[nameTable],
            () => encoders.default
        )(encoders)
    }),
    acc
)


export default evolCompose(
    ['mergeInDB', mergeInDB],
    ['reduce_dbs_assoc', reduce_dbs_assoc],
    ['assoc_newFxs', assoc_newFxs],
    ['newFxs', newFxs]
)(
    children => children.mergeInDB
)