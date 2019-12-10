import { ifElse, has, tryCatch, then } from 'ramda'
import subdbs from "./subdbs"
import put from './put'

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
            console.log('_id::', _id)
            try {
                let existKey = await rev.get(_id)
                return existKey
            } catch (error) {
                return error
            }


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