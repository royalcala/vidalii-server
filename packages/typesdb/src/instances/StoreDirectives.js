// const types = ({ parent, alias, fx, store }) => {
//     if (parent === null)
//         throw new Error(`You have an Error on resolver.type:${alias}. Needs a parent Name`)
//     if (!store[parent])
//         store[parent] = {}
//     store = {
//         ...store,
//         [parent]: {
//             ...store[parent],
//             [alias]: fx
//         }
//     }
//     store = types
// }
// const queries = ({ alias, fx, store }) => store[alias] = fx
// const mutations = ({ alias, fx, store }) => store[alias] = fx
const Store = () => {
    const store = {}
    return {
        add: ({ name, sdl, resolver }) => {

        },
        getStore: () => store
    }
}
const instance = Store()

require("glob").sync('src/directives/*.js')
    .forEach(path => {
        console.log(path)
        console.log(require('../../'+path))
        //  instance.add(require(path))
    })
export default instance

