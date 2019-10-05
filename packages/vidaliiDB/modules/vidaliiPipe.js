const R = require('ramda')

const execPipe = listFxs => initialValue => {

    return R.pipe(
        R.reduce(
            (acc, { nameFx, fx }) => {
                try {
                    return {
                        ...acc,
                        [nameFx]: fx(acc)
                    }
                } catch (error) {
                    console.log('Error on fx:' + nameFx)
                    console.log(error)
                    // return new Error("Can't divide by zero")
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

module.exports = ({ pipe, fxs }) => {
    const listFxs = orderedPipe(pipe.fxs)(fxs)
    return execPipe(listFxs)
}