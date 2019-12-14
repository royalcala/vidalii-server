import { pipe } from 'ramda'
export const VIDALIILEAF = 'vidaliiLeaf'

const reduceUpdate = (updateFx, ...otherFxs) => value => {
    let pipeFxs = [].concat(updateFx, otherFxs)
    let finalValueOfOneNodeToSave = pipeFxs.reduce(
        (acc, fx) => fx({ newValue: acc }),
        value
    )
    return finalValueOfOneNodeToSave
}

const reduceInsert = (insertFx, ...otherFxs) => value => {
    let pipeFxs = [].concat(insertFx, otherFxs)
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
        update = x => x
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