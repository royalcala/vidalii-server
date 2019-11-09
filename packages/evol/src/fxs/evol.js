import { pipe, reduce } from 'ramda'

export default (...fxs) => selection => connection => {
    // var store = {}
    var evolution = pipe(
        reduce(
            (accStore, [alias, fx]) => {

                return {
                    ...accStore,
                    [alias]: fx(accStore)
                }
            },
            connection
        )
    )(fxs)

    return selection(evolution)

}