import { pipe } from 'ramda'
export const VIDALIILEAF = 'vidaliiLeaf'

const reduceUpdate = (...allPipeFxs) => value => {
    let pipeFxs = [].concat(...allPipeFxs)
    let finalValueOfOneNodeToSave = pipeFxs.reduce(
        (acc, fx) => fx({ newValue: acc }),
        value
    )
    return finalValueOfOneNodeToSave
}

// const reduceInsert = (insertFx, ...otherFxs) => value => {
// let pipeFxs = [].concat(insertFx, otherFxs)
const reduceInsert = (...allPipeFxs) => value => {
    let pipeFxs = [].concat(...allPipeFxs)
    let finalValueOfOneNodeToSave = pipeFxs.reduce(
        (acc, fx) => fx({ newValue: acc }),
        value
    )
    return finalValueOfOneNodeToSave
}

export default ({
    type,
    validationType
}) => (
    {
        insert = ({ newValue }) => newValue,
        update = ({ newValue }) => newValue
    } = {}) => {
        return {
            [VIDALIILEAF]: true,
            type,
            insert: reduceInsert(
                insert,
                validationType
            ),
            update: reduceUpdate(
                update,
                validationType
            )
        }
    }