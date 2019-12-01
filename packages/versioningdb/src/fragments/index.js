import encapsulatedbextend from '@vidalii/encapsulatedbextend'
import encodingdb from '@vidalii/encodingdb'
import subdb from '@vidalii/subdb'
import revCodecs from './revCodecs'
import seqCodecs from './seqCodecs'
import docCodecs from './docCodecs'

const main = ({ db }) => {
    const rev = pipe(
        subdb({ prefix: 'rev' }),
        encodingdb(revCodecs),
        encapsulatedbextend
    )(db)
    const seq = pipe(
        subdb({ prefix: 'seq' }),
        encodingdb(seqCodecs),
        encapsulatedbextend
    )(db)
    const doc = pipe(
        subdb({ prefix: 'doc' }),
        encodingdb(docCodecs),
        encapsulatedbextend
    )(db)
    return {
        rev,
        seq,
        doc
    }
}
export default main