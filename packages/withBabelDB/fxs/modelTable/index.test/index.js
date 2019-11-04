import modelTable from '../index'
import insertOneTests from './insertOne'
//https://github.com/marak/Faker.js/
export default ({ up_encoded_db, standarizedResponse }) => {
    var index = null

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
        index = modelTable({ up_encoded_db, standarizedResponse })
        test('modelTable has Functions:get, insertOne?', () => {
            expect(index).toEqual(
                expect.objectContaining({
                    getDoc: expect.any(Function),
                    insertOne: expect.any(Function)
                }),
            );
        })


     
        var docsTest = [
            {
                // _id: 1,
                string: 'hola im string',
                number: 11,
                array: ['1', 2],
                object: { a: 1 }
            }
        ]

        insertOneTests({
            modelTable: index,
            docsTest
        })
        //insert without ID


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
    return index

}
