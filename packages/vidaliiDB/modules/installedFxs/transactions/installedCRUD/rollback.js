const R = require('ramda')


const if_type_updateOne = ({ db }) => [
    ({ type }) => R.equals('updateOne', type),
    () => ''
]
const if_type_insertOne = ({ db }) => [
    ({ type }) => R.equals('insertOne', type),
    () => ''
]
const if_type_notFound = [R.T, ({ type }) => console.log(`rollback.type.${type} not found`)]

module.exports = ({ db }) => async ({ idTransaction }) => {
    //return to the previous state of each afected doc
    //generate rollback document
    //find all idTransactions
    //map and change to previous all 
    //close generated rollback document
    try {
        var transactions = await db.find({
            selector: {
                idTransaction: { $eq: idTransaction }
            }
        })
        var list_rollbackALL = R.pipe(
            R.map(
                R.cond([
                    if_type_insertOne({ db }),
                    if_type_updateOne({ db }),
                    if_type_notFound
                ])
            )
        )(transactions.docs)

        var result = await Promise.all(list_rollbackALL)

    } catch (err) {
        console.log(err);
    }

}