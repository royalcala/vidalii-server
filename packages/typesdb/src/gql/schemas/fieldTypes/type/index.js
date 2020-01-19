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
    types,
    ref = null
}) => (dataFromUserInput = {}) => {
    const {
        props = null,//for db.column(name,...props)
        primary = null,//for db.column
        index = null,//for db.column
        unique = null,//for db.column
        notNullable = null,//for db.column
        virtual = null,//dont save the field on database        
        onGet = null, //gql.resolver.type
        onInsert = ({ newValue }) => newValue,
        onUpdate = ({ newValue }) => newValue,
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
        virtual,
        ref,
        onGet,
        onInsert: pipeFxs(
            onInsert
        ),
        onUpdate: pipeFxs(
            onUpdate,
            // validationType
        ),
    }
}