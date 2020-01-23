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
    /*ref = null*/
    ...otherData1
}) => (dataFromUserInput = {}) => {
    const {
        /*
         props = null,
         primary = null,
         index = null,
         unique = null,
         notNullable = null,
         virtual = null,       
         onGet = null,
         */
        onInsert = ({ newValue }) => newValue,
        onUpdate = ({ newValue }) => newValue,
        ...otherData2
    } = dataFromUserInput
    // if (otherData2.props)
    //     otherData2.props = Array.isArray( otherData2.props) ?  otherData2.props : [ otherData2.props] //size, etc props of column

    return {
        // [VIDALIILEAF]: true,
        types,
        ...otherData1,
        ...otherData2,
        // props,
        // primary,
        // index,
        // unique,
        // notNullable,
        // virtual,
        // ref,
        // onGet,
        onInsert: pipeFxs(
            onInsert
        ),
        onUpdate: pipeFxs(
            onUpdate,
            // validationType
        ),
    }
}