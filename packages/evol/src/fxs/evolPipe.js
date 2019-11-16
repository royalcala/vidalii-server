// import { reduce } from 'ramda'

export default (...fxs) => fxReturnSelection => initialValues => {
    // var store = {}
    var evolution =
        fxs.reduce(
            (accStore, [alias, fx]) => {

                return {
                    ...accStore,
                    [alias]: fx(accStore)
                }
            },
            initialValues
        )
        // (fxs)

    return fxReturnSelection(evolution)

}