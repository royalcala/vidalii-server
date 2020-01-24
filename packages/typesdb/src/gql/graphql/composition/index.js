import sdlType from "./sdl/type";
import sdlQuery from './sdl/query'
import sdlMutation from './sdl/mutation'

import rmutation from './resolvers/mutation'
import rquery from './resolvers/query'
import rtype from './resolvers/type'


export const sdl = {
    type: sdlType,
    query: sdlQuery,
    mutation: sdlMutation
}


export const resolvers = {
    type: rtype,
    mutation: rmutation,
    query: rquery
}