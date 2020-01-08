import mutationOne from './mutationOne'
// import updateOne from './updateOne'


export default ({ schema, db, customPipes }) => {
    const one = mutationOne(schema, db, customPipes)
    return {
        mutationOne: one,
        // updateOne: updateOne(schema, db, customPipes)
    }
}