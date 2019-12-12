const R = require('ramda')

const execPipe = listFxs => initialValue => {
    // console.log('initialValue::', initialValue)
    return R.pipe(
        R.reduce(
            (acc, { nameFx, fx }) => {
                // console.log('acc::', Object.keys(acc))

                try {
                    return {
                        ...acc,
                        [nameFx]: fx(acc)
                    }
                } catch (error) {
                    console.log('Error on fx:' + nameFx)
                    // console.log('fx::', fx)
                    console.log(error)
                }
            },
            initialValue
        )
    )(listFxs)
}

const orderedPipe = listFxs => fxs => R.pipe(
    R.map(
        (nameFx) => ({
            nameFx,
            fx: fxs[nameFx]
        })
    )
)(listFxs)

module.exports = ({ configFxs, fxs }) => {
    // console.log('fxs', fxs)
    const listFxs = orderedPipe(configFxs.processOrder)(fxs)
    // console.log('listFxs::', listFxs)
    return execPipe(listFxs)
}