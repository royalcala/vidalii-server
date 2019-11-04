import { isNil } from 'ramda'



export default async ({ modelTable, docsTest = [] }) => {
    describe('.insertOne', () => {
        var i
        for (i in docsTest) {
            // modelTable({ ...docsTest[i] })
            console.log(docsTest[i])
            test(`${i}`, async () => {
                var inserted = await modelTable.insertOne(docsTest[i])
                console.log('inserted:', inserted)
                expect(true).toEqual(true)
            })
        }
        // test(`.createReadStream(size:${docsTest.length})`, async () => {
        //     var streamed = await streamData({ db, docsTest })
        //     // console.log('streamed:', streamed)
        //     expect(docsTest.length).toEqual(streamed)
        // })

        // for (i in docsTest) {
        //     testDelete({ i, db, docTest: docsTest[i] })
        // }

    })



}
