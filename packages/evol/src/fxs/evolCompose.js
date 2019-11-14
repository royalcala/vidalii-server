// import { reduceRight } from 'ramda'

export default (...fxs) => fxReturnSelection => (initialValues = {}) => {
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