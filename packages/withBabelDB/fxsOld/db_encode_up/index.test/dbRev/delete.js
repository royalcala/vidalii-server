import { isNil } from 'ramda'
export default ({ i, db, docTest }) => {
    test(`${i}.del`, async () => {
        const deleteDoc = async () => {
            var eliminated
            try {
                var response = await db.del(docTest.key)
                eliminated = isNil(response)
            } catch (error) {
                console.log('error in docs.del', error)
                eliminated = false
            }
            return eliminated
        }
        const existDeleted = async () => {
            var exist
            try {
                var response = await db.get(docTest.key)
                //if not exits throw a error catch
                exist = true
            } catch (error) {
                exist = false
            }
            return exist
        }

        var r1 = await deleteDoc()
        expect(r1).toEqual(true)

        var r2 = await existDeleted()
        expect(r2).toEqual(false)
    })
}