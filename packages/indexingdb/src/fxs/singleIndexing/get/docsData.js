import { ifElse, hasPath } from 'ramda'

const callPromiseGet = docsdb => {
    let docsFound = []
    return {
        add: async idDoc => {
            try {
                let response = await docsdb.get(idDoc)
                response.data._id = idDoc
                docsFound.push(response.data)
            } catch (error) {
                //not found
                // console.log('error::', error)
            }
        },
        getDocs: () => docsFound
    }

}
//more faster
export default async ({ indexDataFound, docsdb, get }) => {
    let promisesGet = callPromiseGet(docsdb)
    let promises = []
    for (let i = 0; i < indexDataFound.length; i++) {
        promises.push(promisesGet.add(indexDataFound[i].idDoc))
        // try {
        //     let response = docsdb.get(indexDataFound[i].idDoc)
        //     // docsFound.push(response.data)
        // } catch (error) {
        //     //not found
        // }
    }
    await Promise.all(promises)
    // console.log('promisesGet.getDocs()::', promisesGet.getDocs())
    //reduce data with the pipe
    return promisesGet.getDocs()
}

//less faster
// export default async ({ indexDataFound, docsdb, get }) => {
//     let docsFound = []
//     for (let i = 0; i < indexDataFound.length; i++) {
//         try {
//             let response = await docsdb.get(indexDataFound[i].idDoc)
//             docsFound.push(response.data)
//         } catch (error) {
//             //not found
//         }
//     }    
//     return docsFound
// }