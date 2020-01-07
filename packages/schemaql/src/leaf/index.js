

const pipeFxs = (...allPipeFxs) => ({ newValue, ...otherData }) => {
    let pipeFxs = [].concat(...allPipeFxs)
    let finalValueOfOneNodeToSave = pipeFxs.reduce(
        (acc, fx) => fx({ newValue: acc, ...otherData }),
        newValue
    )
    return finalValueOfOneNodeToSave
}

export const VIDALIILEAF = 'vidaliiLeaf'

export default ({
    types,
    validationType
}) => (
    {
        index = false,
        insert = ({ newValue }) => newValue,
        update = ({ newValue }) => newValue
    } = {}) => {
        return {
            [VIDALIILEAF]: true,
            types,
            index,
            insert: pipeFxs(
                insert,
                validationType
            ),
            update: pipeFxs(
                update,
                validationType
            )
        }
    }