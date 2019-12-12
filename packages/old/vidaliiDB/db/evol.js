const R = require('ramda')

//fxs [fx,'alias']
module.exports = (...fxs) => {
    var store = {}
    return R.pipe(
        R.reduce(
            (accStore, [alias, fx]) => {
                return {
                    ...accStore,
                    [alias]: fx(accStore)
                }
            },
            store
        )
    )(fxs)
}