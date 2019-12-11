import subdbs from "./subdbs"
import put from './put'
import get from './get'
import defaultsConfig from './configs'
// const main = ({ maxVersions = 5 }) => async db => {
const main = configs => async db => {
    const subdb = subdbs({ db })
    const config = await defaultsConfig({ configs, subdb })

    return {
        ...db,
        put: put({ subdb, get: get(subdb) }),
        get: get(subdb),
        getConfig: () => config
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