import modelTable from '../index'
import insertOneTests from './insertOne'
//https://github.com/marak/Faker.js/
export default ({ up_encoded_db, standarizedResponse }) => {


    describe('fxs.modelTable', () => {

        test('Arguments?', () => {
            expect(up_encoded_db).toEqual(
                expect.objectContaining({
                    docs: expect.any(Object),
                    rev: expect.any(Object),
                    seq: expect.any(Object),
                }),
            );
        })

        test('modelTable has Functions:get, insertOne?', async () => {
            var index = await modelTable({ up_encoded_db, standarizedResponse })
            expect(index).toEqual(
                expect.objectContaining({
                    getDoc: expect.any(Function),
                    insertOne: expect.any(Function)
                }),
            );
        })

        var docsNoId = [
            {
                // _id: 1,
                string: 'hola im string',
                number: 11,
                array: ['1', 2],
                object: { a: 1 }
            },
            {
                // _id: 1,
                string: 'hola im string',
                number: 11,
                array: ['1', 2],
                object: { a: 1 }
            }

        ]

        var docsWithId = [
            {
                _id: 12,
                string: 'hola im string1',
                number: 11,
                array: ['1', 2],
                object: { a: 1 }
            },
            {
                _id: 11,
                string: 'hola im string1',
                number: 11,
                array: ['1', 2],
                object: { a: 1 }
            }
        ]

        //insert without ID
        insertOneTests({
            waitingModelTable: modelTable({ up_encoded_db, standarizedResponse }),
            docsNoId,
            docsWithId
        })



        //insert with ID

        // var revTest = [
        //     {
        //         key: { _id: 1, _rev: 1 },
        //         value: {
        //             dataString: 'hola',
        //             dataNumber: 1,
        //             dataObject: { hola: 1 }
        //         }
        //     },
        //     {
        //         key: { _id: 1, _rev: 2 },
        //         value: {
        //             dataString: 'hola',
        //             dataNumber: 1,
        //             dataObject: { hola: 1 }
        //         }
        //     }
        // ]
        // dbRevTest({ db: index.rev, docsTest: revTest })


    })
    return ''

}
