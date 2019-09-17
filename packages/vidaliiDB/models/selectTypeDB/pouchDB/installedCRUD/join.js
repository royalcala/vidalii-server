const dataloaders = require('../cacheDataLoader')

module.exports = ({ dataBase, dbName }) => async (data) => {
    // PouchDB.plugin(PouchDBFind)
    // console.log('dbName used::', dbName)
    // return ''
    return dataloaders.load({
        dataBase,
        joinData: { ...data }
    })
    // let query = queryMango === null ? { selector: { _id: { $gte: null } } } : queryMango
    // try {
    //     var response = await dataBase.find(query)
    //     return response.docs
    // } catch (err) {
    //     console.log(err);
    //     return err
    // }
}