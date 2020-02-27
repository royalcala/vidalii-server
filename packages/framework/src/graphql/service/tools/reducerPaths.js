import { loadModules, loadGraphqls } from "./loadPath";
const isCustomPath = ({ path, type }) => {
    switch (type) {
        case 'module':
            return loadModules(path)
        case 'graphql':
            return loadGraphqls(path)
    }
}
const checkType = (element, type) => {
    let response
    if (typeof element === 'string')
        response = isCustomPath({ path: element, type })
    else
        response = element

    return response
}
const reducer = (data, type = 'module') => data.reduce(
    (acc, element) => {
        const { sdl, resolver } = checkType(element, type)
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
    const Sdl = reducer(sdls, 'graphql')
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

