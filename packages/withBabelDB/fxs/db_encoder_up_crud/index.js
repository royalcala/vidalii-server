import { evol } from '@vidalii/evol'
import { toPairs, reduce, assoc } from 'ramda'
import reduceDbs_assoc_newFxs from './newFxs'

const reduceDbs_assoc = ({ standarizedResponse }) => (acc, [nameTable, valueTable]) => assoc(
    nameTable,
    reduceDbs_assoc_newFxs({ nameTable, valueTable, standarizedResponse }),
    acc
)
const reduceDbs = ({ dbEncoderToArray, standarizedResponse }) => reduce(
    reduceDbs_assoc({ standarizedResponse }),
    {}
)(dbEncoderToArray)

const dbEncoderToArray = ({ db_encode_up }) => toPairs(db_encode_up)

export default evol(
    ['dbEncoderToArray', dbEncoderToArray],
    ['reduceDbs', reduceDbs]
)(
    selected => selected.reduceDbs
)
