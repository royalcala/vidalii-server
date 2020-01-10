import { validateInsert } from './validateNewDoc'
import { reducePipeFxs } from './reducePipeFxs'
import { batchInsert, updateDoc } from './crudFxs'
import mutateDoc from './mutateDoc'



const defaultFx = ({ newDoc }) => newDoc
export default (schema, db,
    { //over root _insert, _update, _del
        beforeValidateInsert = defaultFx,
        beforeSaveInsert = defaultFx,
        afterSaveInsert = defaultFx,
    } = {}
) => async newDoc => {
    try {
        // Does not start a transaction yet
        // const trx = await db.transactionProvider();
        // const trx = await db.transaction();
        const insert = batchInsert()
        // let newDoc = reducePipeFxs(
        //     beforeValidateInsert,
        //     validateInsert({ schema }),
        //     beforeSaveInsert,
        //     afterSaveInsert
        // )({ newDoc })

        // let response = await db.insertOne(key, newDoc)
        console.log('insert.getStore()::', insert.getStore())
        let responseMutateDoc = await mutateDoc({ crud: { insert }, schema, tableName: 'root', newDoc })
        console.log('insert.getStore()::', insert.getStore())
        // Starts a transaction
        // const trxStart = await trx();
        const trx = await db.transaction();
        let inserted = await insert.exec({ trx })
        if (inserted.error === null) {
            await trx.commit();
            return {
                error: null
            }
        } else {
            await trx.rollback();
            return {
                error: inserted.error
            }
        }
        return ''
        // return ({
        //     ...response,
        //     schemadb: {
        //         value: newDoc
        //     }
        // })
    } catch (err) {
        return ({
            error: {
                msg: 'Error on schemadb.insertOne:' + err
            }
        })
    }

}