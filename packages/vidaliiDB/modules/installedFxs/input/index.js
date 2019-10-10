const fs = require('fs')
const R = require('ramda')
module.exports = ({ pathToInputs }) => {
    let store = {}

    fs.readdirSync(pathToInputs).map(
        (nameDir0) =>//inputs/*
            fs.readdirSync(pathToInputs + '/' + nameDir0).map(
                (nameDir1) => //inputs/*/*
                    fs.readdirSync(pathToInputs + '/' + nameDir0 + '/' + nameDir1).map(
                        (nameFile) => {//inputs/*/*/nameFile
                            let formatNameFile = R.replace('.js', '', nameFile)
                            store = R.assocPath(
                                [nameDir0, nameDir1, formatNameFile],
                                require(`${pathToInputs}/${nameDir0}/${nameDir1}/${nameFile}`),
                                store
                            )
                        }
                    )

            )
    )
    // console.log('store::', store)

    return store
}


// //inputs/transactions/databases/*
// const readLevel3 = ({ pathToLevel3 }) => R.pipe(
//     fs.readdirSync,
//     R.map(nameLevel3 => {
//         let nameFile = R.replace('.js', '', nameLevel3)
//         console.log('readLevel3:::', pathToLevel3 + '/', nameLevel3)
//         return {
//             [nameFile]: require(pathToLevel3 + '/', nameLevel3)
//         }
//     }),
//     R.mergeAll
// )(pathToLevel3)


// //inputs/transactions/databases
// const readLevel2 = ({ pathToLevel2 }) => R.pipe(
//     fs.readdirSync,
//     R.map(nameLevel2 => {
//         // let nameFile = R.replace('.js', '', nameLevel2)
//         return {
//             [nameLevel2]: readLevel3({
//                 pathToLevel3: pathToLevel2 + '/' + nameLevel2
//             })
//         }
//     }),
//     R.mergeAll
// )(pathToLevel2)


// //inputs/transactions/
// const readLevel1 = ({ pathToLevel1 }) => R.pipe(
//     fs.readdirSync,
//     R.map(nameLevel1 => {
//         return {
//             [nameLevel1]: readLevel2({
//                 pathToLevel2: pathToLevel1 + '/' + nameLevel1
//             })
//         }
//     }),
//     R.mergeAll
// )(pathToLevel1)

// //inputs/
// // const readLevel0 = ({ pathToInputs }) => R.pipe(
// //     fs.readdirSync,
// //     R.map(nameLevel0 => {
// //         return {
// //             [nameLevel0]: readLevel1({
// //                 pathToLevel1: pathToInputs + '/' + nameLevel0
// //             })
// //         }
// //     }),
// //     R.mergeAll
// // )(pathToInputs)

// const readLevel0 = ({ pathToInputs }) => R.pipe(
//     R.map(nameDir0 =>//inputs/*
//         R.map(//inputs/*/*
//             nameDir1 =>
//                 R.reduce(//inputs/tr/databases/*
//                     (acc, nameFile) =>
//                         R.assocPath(
//                             [nameDir0, nameDir1, nameFile],
//                             require(`${pathToInputs}/${nameDir0}/${nameDir1}/${nameFile}`),
//                             acc
//                         ),
//                     {},
//                     fs.readdirSync(pathToInputs + '/' + nameDir0 + '/' + nameDir1)
//                 ),
//             fs.readdirSync(pathToInputs + '/' + nameDir0)
//         )
//     ),
//     R.mergeAll
// )(fs.readdirSync(pathToInputs))