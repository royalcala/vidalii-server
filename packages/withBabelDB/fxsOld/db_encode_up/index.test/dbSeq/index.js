import { isNil } from 'ramda'
import streamData from './streamData'
import streamSearch from './streamSearch'
import testPutAndGet from './putAndGet'
import testDelete from './delete'

export default async ({ db, docsTest = [] }) => {
    describe('db.Seq', () => {
        var i
        for (i in docsTest) {
            testPutAndGet({ i, db, docTest: docsTest[i] })
        }
        test(`.createReadStream(size:${docsTest.length})`, async () => {
            var streamed = await streamData({ db, docsTest })
            // console.log('streamed:', streamed)
            expect(docsTest.length).toEqual(streamed)
        })

        test(`.createReadStream.getLast`, async () => {
            var streamed = await streamSearch({
                db,
                search: {
                    lt: { _seq: 999999999 },
                    limit: 1,
                    reverse: true
                }
            })
            expect(
                docsTest[docsTest.length - 1].key._seq
            ).toEqual(streamed[0].key._seq)
        })

        for (i in docsTest) {
            testDelete({ i, db, docTest: docsTest[i] })
        }

    })



}
