import { pipe, reduce } from 'ramda'

//fxs [fx,'alias']
export default (...fxs) => {
    var store = {}
    return pipe(
        reduce(
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