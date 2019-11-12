export default [
    [
        'db_encode_up_crud1',
        ({ db_encode_up_crud }) => {
            describe('db_encode_up_crud', () => {
                test('docs.put&&get&&del&&get', async () => {
                    // console.log('db_encode_up_crud:',
                    //     Object.keys(db_encode_up_crud)
                    // )
                    var result = await db_encode_up_crud.docs.put('911', { jolai: 1 })
                    // console.log(result)
                    expect(result.error).toEqual(null)
                    var getResult = await db_encode_up_crud.docs.get('911')
                    expect(getResult.data.value).toEqual({ jolai: 1 })

                    var deleted = await db_encode_up_crud.docs.del('911')
                    expect(deleted.error).toEqual(null)

                    var getResult2 = await db_encode_up_crud.docs.get('911')
                    // console.log('getResult2:', getResult2)
                    expect(getResult2.error).not.toEqual(null)
                })
            })

        }
    ]
]