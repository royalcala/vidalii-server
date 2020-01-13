import { T, mergeDeepRight, mergeDeepWithKey, pipe, cond, type, equals, nthArg, concat } from 'ramda'
import * as fp from '../fpFxs'

// const typeOf2doArg = data => equalsTo => pipe(nthArg(1), type, equals(equalsTo))(data)
const isIt = (k, l, r) => nameOfType => equals(type(l), nameOfType)
const conditionalValue = actions => cond([
    [isIt('Array'), actions.valueIsArray],
    [isIt('Number'), actions.valueIsString],
    [isIt('String'), actions.valueIsString],
])

const updateJson = async ({ key, db, prevDoc, newDoc, actions }) => {
    let newObject = await mergeDeepWithKey(conditionalValue(actions), prevDoc, newDoc)
    let response = db.put(kye, newObject)
    return newObject
}

const initDefaultActions = ({ actions }) => {
    var defaults = {
        valueIsArray: fp.concat,
        valueIsString: (k, prev, n) => n,
        valueIsNumber: (k, prev, n) => n
    }
    return mergeDeepRight(defaults, actions)
}

const main = ({ db, getOne }) => async (key, value, { actions = {} }) => {
    actions = initDefaultActions({ actions })
    let prevDoc = await getOne(key)
    return ifElse(
        () => prevDoc.error === null,
        updateJson,
        () => ({
            error: {
                msg: `The key ${key}already exist. Please select other key`
            }
        }),
    )({ key, db, prevDoc, newDoc: value, actions })
}

export default main