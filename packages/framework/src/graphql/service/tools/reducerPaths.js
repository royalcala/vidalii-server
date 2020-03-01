import { loadModules, loadGraphqls, loadFiles } from "./loadPath";
// const isCustomPath = ({ path, type }) => {
//     switch (type) {
//         case 'module':
//             return loadModules(path)
//         case 'graphql':
//             return loadGraphqls(path)
//     }
// }
// response = isCustomPath({ path: element, type })
/*
estructure of array elements: 
module.exports = {
    sdl: `scalar JSON`,
    resolver: { JSON: GraphQLJSON }
}
sdls:
must to be extend Query, and extend Mutation
*/

// scalars: [
//     fromFramework1, fromFramework2,
//     "fromCustomGlobPath"
// ]
const checkType = element => {
    switch (typeof element) {
        case 'string':
            //is a path "/dir1/dir2/*.js" get all and reduce in {sdl,resolver}
            return loadFiles(element)
        default:
            //is a {sdl,resolver} = obj
            return element
    }
}
const reducer = data => data.reduce(
    (acc, element) => {
        const { sdl, resolver } = checkType(element)
        return {
            sdl: acc.sdl.concat('\n', sdl),
            resolver: { ...acc.resolver, ...resolver }
        }
    },
    {
        sdl: '',
        resolver: {}
    }
)

export default ({ context = null, scalars = [], directives = [], sdls = [], types = [], queries = [], mutations = [] } = {}) => {
    const Scalar = reducer(scalars)
    const Directive = reducer(directives)
    // const Sdl = reducer(sdls, 'graphql')
    const Sdl = reducer(sdls)    
    const Types = reducer(types)
    const Queries = reducer(queries)
    const Mutations = reducer(mutations)
    return {
        Scalar,
        Directive,
        Sdl,
        Types,
        Queries,
        Mutations
    }

}

