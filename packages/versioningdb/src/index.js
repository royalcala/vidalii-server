import Subdbs from "./subdbs"
import Put from './put'
import getLastRev from './getLastRev'
import DefaultsConfig from './configs'
// const main = ({ maxVersions = 5 }) => async db => {
const main = (configs = {}) => async db => {
    const subdb = Subdbs({ db })
    const config = await DefaultsConfig({ configs, subdb })
    const get = getLastRev(subdb)
    const { insertOne, replaceOne } = Put({ config, subdb, get })
    return {
        // ...db,
        composition: {
            ...db.composition,
            versioningdb: true
        },
        insertOne,
        replaceOne,
        get,
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