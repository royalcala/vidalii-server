import validateInsert from './validateInsert'

const reduceInsert = (...allPipeFxs) => ({ newDoc }) => {
    let pipeFxs = [].concat(...allPipeFxs)
    let finalDoc = pipeFxs.reduce(
        (acc, fx) => fx({ newDoc: acc }),
        newDoc
    )
    return finalDoc
}

const defaultFx = ({ newDoc }) => newDoc
export default (schema, db,
    {
        preValidateInsert = defaultFx,
        preSaveInsert = defaultFx,
        afterSaveInsert = defaultFx,
    } = {}
) => async (key, value) => {
    try {
        let newDoc = reduceInsert(
            preValidateInsert,
            preSaveInsert,
            validateInsert(schema),
            afterSaveInsert
        )({ newDoc: value })

        let response = await db.insertOne(key, newDoc)
        return ({
            ...response,
            schemadb: {
                value: newDoc
            }
        })
    } catch (err) {
        return ({
            error: {
                msg: 'Error on schemadb.insertOne:' + err
            }
        })
    }

}