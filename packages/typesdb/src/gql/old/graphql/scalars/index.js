import json from './json'


const scalars = {
    sdl: json.sdl,
    resolvers: {
        ...json.resolvers
    }
}

export default scalars