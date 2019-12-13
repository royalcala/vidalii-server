import { ifElse, has } from 'ramda'
import insertOneWithAutoID from './insertOneWithAutoID'
import replaceOne from './replaceOne'
import insertOneWithManualID from './insertOneWithManualID'

// export default (fxs) => data => ifElse(
//     has('_id'),
//     ifElse(
//         has('_rev'),
//         replaceOne,
//         insertOneWithManualID
//     ),
//     insertOneWithAutoID
// )(data, fxs)


export default fxs => ({
    insertOne: (key, value) => ifElse(
        has('_id'),
        insertOneWithManualID,
        insertOneWithAutoID
    )({ ...key, ...value }, fxs),
    replaceOne: (key, value) => replaceOne({ ...key, ...value }, fxs)
})