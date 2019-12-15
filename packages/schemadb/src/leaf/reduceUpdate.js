
export default (...allPipeFxs) => ({ prevDoc, prevValue, newValue }) => {
    let pipeFxs = [].concat(...allPipeFxs)
    let finalValueOfOneNodeToSave = pipeFxs.reduce(
        (acc, fx) => fx({ prevDoc, prevValue, newValue: acc }),
        newValue
    )
    return finalValueOfOneNodeToSave
}