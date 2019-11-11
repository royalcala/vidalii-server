// import { reduceRight } from 'ramda'

export default (...fxs) => fxReturnSelection => initialValues => {
    // var store = {}
    // var evolution =
    //     reduceRight(
    //         (accStore, [alias, fx]) => {

    //             return {
    //                 ...accStore,
    //                 [alias]: fx(accStore)
    //             }
    //         },
    //         initialValues
    //     )(fxs)
    var evolution =
        fxs.reduceRight(
            (acc, [alias, fx]) => {

                return {
                    ...acc,
                    [alias]: fx(acc)
                }
            },
            initialValues
        )

    return fxReturnSelection(evolution)

}