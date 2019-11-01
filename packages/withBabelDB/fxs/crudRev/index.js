import evol from '../../evol'
import insertOne from './fxs/insertOne'
import getLast from './fxs/getLast'


var fxsToEvol = [
    [
        'input',
        (initialValue) => initialValue
    ],
    [
        'getLast',
        getLast
    ],
    [
        'testLast',
        async ({ getLast }) => {
            console.log('getLast::')
            var result = await getLast({ _id: 1, _rev: 1 })
            console.log('getLast::', result)


        }
    ],
    [
        'insertOne',
        insertOne
    ],

]
var resultEvol = evol(...fxsToEvol)

export default ({ up_encoded_db: db, standarizedResponse }) => {
    var evolved = resultEvol({
        db,
        standarizedResponse
    })
    return evolved
    // return {
    //     insertOne,
    //     getLast,
    //     conflictCheck: ({ _id, _rev }) => {

    //     },
    //     getAll: (_id) => {

    //     }
    // }
}
