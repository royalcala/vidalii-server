import getDoc from './getDoc'

// const store = () => {
//     let cache = {}
//     return {
//         get: (key) => {

//         },
//         set: (key) => {

//         }
//     }
// }




const storage = () => {
    let cache = {}
}

const main = ({ db }) => {
    let store = {}
    let lockKey = {}
    return {
        getDoc: key => getDoc({ db, key, storage }),
        getRev: async (key) =>
            //  {
            //     // let lastRev = 0
            //     if (has()) {

            //     }
            // await db.iteratorP({
            //     onData: k => lastRev = k,
            //     values: false
            // })
            // store[key] = {
            //     lastRev
            // }
            // return lastRev
            // }
            pipe(
                ifElse(
                    hasPath(['store', key]),
                    ({ store, key }) => store[key],
                    pipe(
                        async ({ key, store, db }) => {
                            let lastRev = 0
                            await db.iteratorP({
                                onData: k => lastRev = k,
                                values: false
                            })
                            store[key] = {
                                lastRev
                            }
                            return lastRev
                        }
                    )
                )
                    ({ key }) => db.get(key),
                        then(
                            ifElse(
                                propEq('error', null),

                            )
                        )
) ({ key, store, db })


    }
}

export default main 