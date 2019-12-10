import { ifElse, has, tryCatch, then } from 'ramda'
import subdbs from "./subdbs"
import put from './put'
import { toEncodeRev } from './subdbs/revCodecs'
// const addEncapsulatedb = db => ifElse(
//     propEq('encapsulatedb', true),
//     x => x,
//     x => encapsulatedb(db)
// )(db)

const main = ({ maxVersions = 5 }) => db => {
    const { rev, seq, doc } = subdbs({ db })
    // console.log('rev::',rev)
    return {
        ...db,
        put: put({ rev }),
        get: async _id => {
            console.log('on get:_id::', _id)
            let lastRev = null

            await rev.iteratorP({
                onData: x => lastRev = x,
                reverse: true,
                gte: { _id, encodedRev: '\x00' },
                lte: { _id, encodedRev: '\xFF' },
                limit: 1,

            })
            // return lastRev
            if (lastRev !== null) {
                const { _id, _rev_num, _rev_id } = lastRev.key
                return {
                    _id,
                    _rev: toEncodeRev({ _rev_num, _rev_id }),
                    ...lastRev.value
                }
            }
            else
                return lastRev
        }

        // var revOps = [
        //     { type: 'put', key: 'name', value: 'Yuri Irsenovich Kim' },
        //     { type: 'put', key: 'dob', value: '16 February 1941' },
        //     { type: 'put', key: 'spouse', value: 'Kim Young-sook' },
        //     { type: 'put', key: 'occupation', value: 'Clown' },
        //     { type: 'del', key: 'father' },
        // ]

        // db.batch(ops, function (err) {
        //     if (err) return console.log('Ooops!', err)
        //     console.log('Great success dear leader!')
        // })


    }
}

export default main