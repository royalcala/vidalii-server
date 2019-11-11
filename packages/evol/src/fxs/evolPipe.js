import { reduce } from 'ramda'

export default (...fxs) => fxReturnSelection => initialValues => {
    // var store = {}
    var evolution =
        reduce(
            (accStore, [alias, fx]) => {

                return {
                    ...accStore,
                    [alias]: fx(accStore)
                }
            },
            initialValues
        )(fxs)

    return fxReturnSelection(evolution)

}