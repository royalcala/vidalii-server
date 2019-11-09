import { isNil } from 'ramda'
import streamData from './streamData'
import testDelete from './delete'
import testPutAndGet from './putAndGet'

export default async ({ db, docsTest = [] }) => {
    describe('db.Docs', () => {
        var i
        for (i in docsTest) {
            testPutAndGet({ i, db, docTest: docsTest[i] })
        }
        test(`.createReadStream(size:${docsTest.length})`, async () => {
            var streamed = await streamData({ db, docsTest })
            // console.log('streamed:', streamed)
            expect(docsTest.length).toEqual(streamed)
        })

        for (i in docsTest) {
            testDelete({ i, db, docTest: docsTest[i] })
        }

    })



}
