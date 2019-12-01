import { pipe, then, propEq, hasPath } from 'ramda'
import createFragments from "./fragments";

// const addEncapsulatedb = db => ifElse(
//     propEq('encapsulatedb', true),
//     x => x,
//     x => encapsulatedb(db)
// )(db)


const main = ({ maxVersions = 5 }) => db => {
    const { rev, seq, doc } = createFragments({ db })

    return {
        put: (key, value) => {
            // key, revision->increment
            //
            var revOps = [
                { type: 'put', key: 'name', value: 'Yuri Irsenovich Kim' },
                { type: 'put', key: 'dob', value: '16 February 1941' },
                { type: 'put', key: 'spouse', value: 'Kim Young-sook' },
                { type: 'put', key: 'occupation', value: 'Clown' },
                { type: 'del', key: 'father' },
            ]

            db.batch(ops, function (err) {
                if (err) return console.log('Ooops!', err)
                console.log('Great success dear leader!')
            })

        },
        updateOne: (key, value) => {

        }
    }
}

export default main