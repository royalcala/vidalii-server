import { ifElse, has } from 'ramda'


export default fxs => ({
    insertOne: (key, value) => ifElse(
        has('_id'),
        insertOneWithManualID,
        insertOneWithAutoID
    )({ ...key, ...value }, fxs),
    replaceOne: (key, value) => replaceOne({ ...key, ...value }, fxs)
})