import { validateInsert } from './validateNewDoc'
import { reducePipeFxs } from './reducePipeFxs'
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
        const trx = await db.transaction();
        // let newDoc = reducePipeFxs(
        //     beforeValidateInsert,
        //     validateInsert({ schema }),
        //     beforeSaveInsert,
        //     afterSaveInsert
        // )({ newDoc })

        // let response = await db.insertOne(key, newDoc)

        let response = await mutateDoc({ trx, schema, tableName: 'root', db, newDoc })
        await trx.commit();
        return response
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