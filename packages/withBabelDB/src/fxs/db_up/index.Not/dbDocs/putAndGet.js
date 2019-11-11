import { isNil } from 'ramda'
export default ({ i, db, docTest }) => {
    test(`${i}.put|get`, async () => {
        const putDoc = async () => {
            var inserted
            try {
                var response = await db.put(docTest.key, docTest.value)
                inserted = isNil(response)
            } catch (error) {
                console.log('putDoc Error:', error)
                inserted = false
            }
            return inserted

        }
        const getDoc = async () => {
            var response
            try {
                var response = await db.get(docTest.key)
            } catch (error) {
                response = false
            }
            return response
        }

        var responsePut = await putDoc()
        expect(responsePut).toEqual(true)

        var responseGetDoc = await getDoc()
        expect(responseGetDoc).toEqual(
            expect.objectContaining({
                dataString: expect.any(String),
                dataNumber: expect.any(Number),
                dataObject: expect.any(Object),
            })
        );
        // resolve()
    })
}