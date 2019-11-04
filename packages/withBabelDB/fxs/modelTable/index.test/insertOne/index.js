import { isNil } from 'ramda'

const insertOne = ({ waitingModelTable, i, task, data }) => {
    test(`${i}.${task}`, async () => {

        var modelTable = await waitingModelTable
        // console.log(i + 'docsWithId[i]::', docsWithId[i])
        var inserted = await modelTable.insertOne(data)
        console.log('inserted:', inserted)
        expect(inserted.error).toEqual(null)
    })
}

export default async ({ waitingModelTable, docsNoId = [], docsWithId = [] }) => {
    // console.log('modelTable::', modelTable)

    describe('.insertOne', () => {
        for (var i in docsNoId) {
            insertOne({
                waitingModelTable,
                i,
                task: 'withNoId',
                data: docsNoId[i]
            })
        }

        for (var i in docsWithId) {
            insertOne({
                waitingModelTable,
                i,
                task: 'withNoId',
                data: docsWithId[i]
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
