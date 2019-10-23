const R = require('ramda')

//fxs [fx,'alias']
module.exports = (initial, ...fxs) => {
    var store = { initial }
    return R.pipe(
        R.reduce(
            (accStore, [fx, alias]) => {
                return {
                    ...accStore,
                    [alias]: fx(accStore)
                }
            },
            store
        )
    )(fxs)
}