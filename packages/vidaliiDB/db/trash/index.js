   // insertOneWithPromise: ({ _id = uuidv4(), ...data }) => new Promise((resolve, reject) => {
            //     const duplicateDoc = () => {
            //         resolve(
            //             build_response({
            //                 error: {
            //                     msg: `Error.The _id:${_id}, already exist.`
            //                 }
            //             })
            //         )
            //     }
            //     const insertNewDoc = () => {
            //         db.main.put(_id, data, function (err) {
            //             if (err) {
            //                 resolve(
            //                     build_response({
            //                         error: {
            //                             msg: 'Error on addCRUD->insertOne->insertNewDoc:', err
            //                         }
            //                     })
            //                 )
            //             } else {
            //                 resolve(
            //                     build_response({
            //                         _rev: 'revision here'
            //                     })
            //                 )
            //             }
            //         })
            //     }

            //     db.main.get(_id, function (response) {
            //         R.ifElse(
            //             R.isNil,
            //             duplicateDoc,
            //             insertNewDoc
            //         )(response)
            //     })

            // }),

            // const indexesInMemory = () => [
//     [
//         'indexesInMemory',
//         ({ db, input }) => new Promise((resolve, reject) => {
//             var databaseInMemory = []
//             var defaultIndex = {
//                 _id: {}
//             }
//             db.main.createReadStream()
//                 .on('data', function (data) {
//                     console.log('Buffers:', 'key:', data.key, 'value:', data.value)
//                     data.value._id = data.key
//                     defaultIndex._id = databaseInMemory.push(data.value)
//                 })
//                 .on('error', function (err) {
//                     console.log('Oh my!', err)
//                 })
//                 .on('close', function () {
//                     console.log('Stream closed')
//                 })
//                 .on('end', function () {
//                     console.log('Stream ended')
//                     // resolve(store)
//                 })
//         })
//     ],
//     [
//         'test_indexes',
//         async ({ indexesInMemory }) => {
//             let a = await indexesInMemory
//             console.log('indexes::', a)
//         }
//     ],
//     [
//         'checkPointers',
//         ({ input }) => {
//             // console.log(input)
//         }
//     ],
// ]