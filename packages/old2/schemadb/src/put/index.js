import insertOne from './insertOne'
import updateOne from './updateOne'


export default ({ schema, db, customPipes }) => {

    return {
        insertOne: insertOne(schema, db, customPipes),
        updateOne: updateOne(schema, db, customPipes)
    }
}