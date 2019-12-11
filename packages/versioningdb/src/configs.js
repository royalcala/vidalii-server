import { mergeDeepRight } from 'ramda'
import { getAutoID } from './uuids'
export const _ID_DB = '_id_db'
const defaults = {
    maxVersions: 5
}
export default async ({ configs, subdb }) => {
    let merged = mergeDeepRight(defaults, configs)
    let _id_db
    try {
        _id_db = await subdb.config.get(_ID_DB)
    } catch (error) {
        //not found
        _id_db = getAutoID()
        await subdb.config.put(_ID_DB, _id_db)
    }
    merged._id_db = _id_db
    return merged
}