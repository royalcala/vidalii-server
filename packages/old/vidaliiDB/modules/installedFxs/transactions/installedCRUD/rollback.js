const R = require('ramda')


const if_type_updateOne = ({ db_transactions }) => [
    ({ type }) => R.equals('updateOne', type),
    () => ''
]
const if_type_insertOne = ({ db_transactions }) => [
    ({ type }) => R.equals('insertOne', type),
    () => ''
]
const if_type_notFound = [R.T, ({ type }) => console.log(`rollback.type.${type} not found`)]

module.exports = ({ dbs }) => async ({ idTransaction }) => {
    //return to the previous state of each afected doc
    //generate rollback document
    //find all idTransactions
    //map and change to previous all 
    //close generated rollback document
    try {
        var transactions = await dbs.transactions.find({
            selector: {
                idTransaction: { $eq: idTransaction }
            }
        })
        var list_rollbackALL = R.pipe(
            R.map(
                R.cond([
                    if_type_insertOne({ dbs }),
                    if_type_updateOne({ dbs }),
                    if_type_notFound
                ])
            )
        )(transactions.docs)

        var result = await Promise.all(list_rollbackALL)

    } catch (err) {
        console.log(err);
    }

}