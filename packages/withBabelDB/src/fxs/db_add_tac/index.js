import { toPairs, reduce, assoc, compose, mergeDeepLeft } from 'ramda'
import fragments_crud from './newFxs'

const exportTAC = db => reduce_dbs => {
    for (var i in db) {
        // console.log(i)        
        db[i].tac = reduce_dbs[i]
    }
    return db
}

const reduce_dbs_assoc = db => assoc_fragments => reduce(
    assoc_fragments,
    {}
)(toPairs(db))

const assoc_fragments = fragments_crud => (acc, [nameTable, valueTable]) => assoc(
    nameTable,
    fragments_crud({ nameTable, valueTable }),
    acc
)

export default globalData => db =>
    compose(
        exportTAC(db),
        reduce_dbs_assoc(db),
        assoc_fragments,
        fragments_crud
    )(globalData)
