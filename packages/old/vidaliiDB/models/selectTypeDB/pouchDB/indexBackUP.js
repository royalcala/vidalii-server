// insertOne: crud.insertOne(initData),
// // insertOne: async (newDoc) => {
// //     var validated = schemaTools.validatorDoc({ schemaValidator, newDoc })
// //     // console.log('validated::', validated)
// //     try {
// //         var response = await dataBase.put(validated);
// //         // console.log('responseInsertOne::', response)
// //         return [{
// //             ...validated,
// //             ...response
// //         }]
// //     } catch (err) {
// //         console.log(err)
// //         return err
// //     }
// // },
// // replace: async (newDoc) => {
// //     var validated = schemaTools.validatorDoc({ schemaValidator, newDoc })

// //     try {
// //         var response = await dataBase.put(validated);
// //         return response
// //     } catch (err) {
// //         console.log(err);
// //         return err
// //     }
// // },
// // update: async (docToUpdate) => {
// //     //always update lasted

// //     try {
// //         var prevDoc = await dataBase.get(docToUpdate._id);
// //         var validated = schemaTools.validatorDoc({ schemaValidator, newDoc: docToUpdate, prevDoc })
// //         //pending merge with arrays
// //         var final = R.mergeDeepRight(prevDoc, validated)
// //         console.log(final)
// //         var updateResponse = await dataBase.put(final);
// //     } catch (err) {
// //         console.log('Error in method Update PouchDB:', err);
// //         return err
// //     }

// //     return updateResponse
// // },
// find: crud.find(initData),
// // find: async (queryMango) => {
// //     PouchDB.plugin(PouchDBFind);
// //     let query = queryMango === null ? { selector: { _id: { $gte: null } } } : queryMango
// //     try {
// //         var response = await dataBase.find(query)
// //         // var response = await dataBase.allDocs({
// //         //     include_docs: true,
// //         //     attachments: true
// //         // });
// //         // // db.find({
// //         // //     selector: { _id: 'dk' },
// //         // //     sort: ['_id']
// //         // // });
// //         // console.log('response.docs::', response.docs)
// //         return response.docs
// //     } catch (err) {
// //         console.log(err);
// //         return err
// //     }
// // }