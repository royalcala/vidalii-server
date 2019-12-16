

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