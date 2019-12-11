import { pipe } from 'ramda'
import encapsulatedbextend from '@vidalii/encapsulatedbextend'
import encodingdb from '@vidalii/encodingdb'
import subdb from '@vidalii/subdb'
import configCodecs from './configCodecs'
import revCodecs from './revCodecs'
import seqCodecs from './seqCodecs'
import docCodecs from './docCodecs'

const main = ({ db }) => {
    const config = pipe(
        subdb({ prefix: 'config' }),
        encodingdb(configCodecs),
    )(db)
    const rev = pipe(
        subdb({ prefix: 'rev' }),
        encodingdb(revCodecs),
    )(db)
    const seq = pipe(
        subdb({ prefix: 'seq' }),
        encodingdb(seqCodecs),
    )(db)
    const doc = pipe(
        subdb({ prefix: 'doc' }),
        encodingdb(docCodecs),
    )(db)
    return {
        config,
        rev,
        seq,
        doc
    }
}
export default main