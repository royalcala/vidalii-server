import { pipe, reduce } from 'ramda'

//fxs [fx,'alias']
export default (...fxs) => (initialValue) => {
    // var store = {}
    return pipe(
        reduce(
            (accStore, [alias, fx]) => {

                return {
                    ...accStore,
                    [alias]: fx(accStore)
                }
            },
            initialValue
        )
    )(fxs)
}