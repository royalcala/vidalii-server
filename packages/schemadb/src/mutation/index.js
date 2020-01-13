import { validateInsert } from './validateNewDoc'
import { reducePipeFxs } from './reducePipeFxs'

import { batchInsert, batchUpdate, batchDel } from './crud'
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
        const update = batchUpdate()
        const del = batchDel()
        // let newDoc = reducePipeFxs(
        //     beforeValidateInsert,
        //     validateInsert({ schema }),
        //     beforeSaveInsert,
        //     afterSaveInsert
        // )({ newDoc })        
        await mutateDoc({ crud: { insert, update, del }, schema, tableName: 'root', newDoc })
        // console.log('insert.getStore()::', insert.getStore())
        // console.log('update.getStore()::', update.getStore())
        // Starts a transaction
        // const trxStart = await trx();
        const trx = await db.transaction();
        let responseCRUD = await new Promise(async (resolve, reject) => {
            let inserted = await insert.exec({ trx })
            if (inserted.error !== null) {
                await trx.rollback()
                resolve(inserted)
            }
            let updated = await update.exec({ trx })
            if (updated.error !== null) {
                await trx.rollback()
                resolve(updated)
            }
            let deleted = await del.exec({ trx })
            if (deleted.error !== null) {
                await trx.rollback()
                resolve(deleted)
            }

            await trx.commit()
            resolve({
                error: null,
                transactionCompleted: trx.isCompleted()
            })
        })
        return responseCRUD


        // if (inserted.error === null) {
        //     let updated = await update.exec({ trx })
        //     if (updated.error === null) {
        //         let deleted = await del.exec({ trx })
        //         if (deleted.error === null) {
        //             await trx.commit();
        //         }
        //     }
        //     return {
        //         error: null
        //     }
        // } else {
        //     await trx.rollback();
        //     return {
        //         error: inserted.error
        //     }
        // }
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