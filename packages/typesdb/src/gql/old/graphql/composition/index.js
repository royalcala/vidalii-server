import sdlType from "./sdl/type";
import sdlQuery from './sdl/query'
import sdlMutation from './sdl/mutation'

import rtype from './resolver/type'

export const sdl = {
    type: sdlType,
    query: sdlQuery,
    mutation: sdlMutation
}


export const resolver = {
    type: rtype,
    mutation: ''
}