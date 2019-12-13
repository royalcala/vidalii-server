import { ifElse, has, pipe } from 'ramda'
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
    insertOne: data => ifElse(
        has('_id'),
        insertOneWithManualID,
        insertOneWithAutoID
    )(data, fxs),
    replaceOne: data => replaceOne(data, fxs)
})