import { ifElse, has } from 'ramda'
import { toEncodeRev } from '../subdbs/revCodecs'
const uuid = require('uuid/v4')


export default ({ rev }) => data => ifElse(
    has('_id'),
    ifElse(
        has('_rev'),
        () => {
            //update document
        },
        () => {
            //crete new document with id personalized
        }
    ),
    async data => {
        console.log('dosnt has _id')
        //docs, seq, rev
        //last rev

        let _id = uuid()
        let _rev_num = 1
        let _rev_id = uuid()
        let encodedRev = toEncodeRev({ _rev_num, _rev_id })
        try {
            let response = await rev.put({ _id, encodedRev }, data)
            console.log('response::', response)
            return {
                _id,
                _rev: encodedRev
            }
        } catch (error) {
            console.log('error::', error)
            return error
        }

    }
)(data)