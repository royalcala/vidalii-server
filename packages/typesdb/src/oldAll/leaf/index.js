import defaults from './defaults'

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
    validationType,
    types
}) => (dataFromUserInput = {}) => {
    const { props, index, unique, insert, update } = defaults(dataFromUserInput)

    return {
        [VIDALIILEAF]: true,
        types,
        props,
        index,
        unique,
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