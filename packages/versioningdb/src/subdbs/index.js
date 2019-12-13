import { pipe } from 'ramda'
import encodingdb from '@vidalii/encodingdb'
import subdb from '@vidalii/subdb'
import systemCodecs from './systemCodecs'
import revCodecs from './revCodecs'
import seqCodecs from './seqCodecs'
import docCodecs from './docCodecs'

const main = ({ db }) => {
    const system = pipe(
        subdb({ prefix: 'system' }),
        encodingdb(systemCodecs),
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
        system,
        rev,
        seq,
        doc
    }
}
export default main