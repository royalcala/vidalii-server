import json from './json'


const scalars = {
    sdl: json.sdl,
    resolvers: {
        ...json.resolver
    }
}

export default scalars