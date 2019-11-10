import { toPairs, reduce, assoc, compose, mergeDeepLeft } from 'ramda'
import assoc_fxs from './newFxs'

const integrateWith_db = db => reduce_dbs => {
    for (var i in db) {
        // console.log(i)
        db[i].tac = reduce_dbs[i]
    }
    return db
}

const reduce_dbs = db => dbs_assoc => reduce(
    dbs_assoc,
    {}
)(toPairs(db))

const dbs_assoc = assoc_fxs => (acc, [nameTable, valueTable]) => assoc(
    nameTable,
    assoc_fxs({ nameTable, valueTable }),
    acc
)

export default globalData => db => {
    // console.log(
    //     'keys:',
    //     Object.keys(db.docs)
    // )
    // console.log(
    //     'keys:',
    //     db.docs.put
    // )
    var newFxs = compose(
        integrateWith_db(db),
        reduce_dbs(db),
        dbs_assoc,
        assoc_fxs
    )(globalData)


    return newFxs
    // console.log(
    //     db
    // )

    // return mergeDeepLeft(
    //     db,

    // )
}
//  {

//     return {
//         db: {
//             ...db,
//             tac: compose(
//                 reduce_dbs(db),
//                 dbs_assoc,
//                 assoc_fxs
//             )(globalData)
//         }

//     }
// }
