
export const castingDB = db => {
    db.insertOne = db.hasOwnProperty('insertOne') ? db.insertOne : db.put
    db.updateOne = db.hasOwnProperty('updateOne') ? db.updateOne : db.put
    db.replaceOne = db.hasOwnProperty('replaceOne') ? db.replaceOne : db.put
    return db
}
