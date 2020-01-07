export const reducePipeFxs = (...allPipeFxs) => ({ prevDoc = {}, newDoc }) => {
    let pipeFxs = [].concat(...allPipeFxs)
    let finalDoc = pipeFxs.reduce(
        (acc, fx) => fx({ prevDoc, newDoc: acc }),
        newDoc
    )
    return finalDoc
}