
export default (...allPipeFxs) => ({ newValue }) => {
    let pipeFxs = [].concat(...allPipeFxs)
    let finalValueOfOneNodeToSave = pipeFxs.reduce(
        (acc, fx) => fx({ newValue: acc }),
        newValue
    )
    return finalValueOfOneNodeToSave
}