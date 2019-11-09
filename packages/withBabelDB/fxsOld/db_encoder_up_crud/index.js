import { evol } from '@vidalii/evol'
import { toPairs, reduce, assoc, compose } from 'ramda'
// import reduceDbs_assoc_newFxs from './newFxs'
import assoc_fxs from './newFxs'
// const reduceDbs_assoc = ({ standarizedResponse }) => (acc, [nameTable, valueTable]) => assoc(
//     nameTable,
//     reduceDbs_assoc_newFxs({ nameTable, valueTable, standarizedResponse }),
//     acc
// )
// const reduceDbs = ({ dbEncoderToArray, standarizedResponse }) => reduce(
//     reduceDbs_assoc({ standarizedResponse }),
//     {}
// )(dbEncoderToArray)

// const dbEncoderToArray = ({ db_encode_up }) => toPairs(db_encode_up)




// export default evol(
//     ['dbEncoderToArray', dbEncoderToArray],
//     ['reduceDbs', reduceDbs]
// )(
//     selected => selected.reduceDbs
// )

const reduce_dbs = parent => dbs_assoc => reduce(
    dbs_assoc,
    {}
)(toPairs(parent.db_encode_up))

const dbs_assoc = assoc_fxs => (acc, [nameTable, valueTable]) => assoc(
    nameTable,
    assoc_fxs({ nameTable, valueTable }),
    acc
)

export default parent => compose(
    reduce_dbs(parent),
    dbs_assoc,
    assoc_fxs
)(parent)
