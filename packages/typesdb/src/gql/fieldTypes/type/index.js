// import defaults from './defaults'

const pipeFxs = (...allPipeFxs) => ({ newValue, ...otherData }) => {
    let pipeFxs = [].concat(...allPipeFxs)
    let finalValueOfOneNodeToSave = pipeFxs.reduce(
        (acc, fx) => fx({ newValue: acc, ...otherData }),
        newValue
    )
    return finalValueOfOneNodeToSave
}

// export const VIDALIILEAF = 'vidaliiLeaf'

export default ({
    types
}) => (dataFromUserInput = {}) => {
    const {
        props = null,
        primary = null,
        index = null,
        unique = null,
        notNullable = null,
        onInsert = ({ newValue }) => newValue,
        onUpdate = ({ newValue }) => newValue,
        virtual = null,//needs onGet, dont save the field
        onGet = null
    } = dataFromUserInput
    if (props !== null)
        props = Array.isArray(data) ? data : [data] //size, etc props of column

    return {
        // [VIDALIILEAF]: true,
        types,
        props,
        primary,
        index,
        unique,
        notNullable,
        onInsert: pipeFxs(
            onInsert
        ),
        onUpdate: pipeFxs(
            onUpdate,
            // validationType
        ),
        onGet
    }
}