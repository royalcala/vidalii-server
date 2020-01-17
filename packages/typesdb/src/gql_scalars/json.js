import GraphQLJSON from 'graphql-type-json';


const scalar = {
    sdl: `scalar JSON`,
    resolver: {
        JSON: GraphQLJSON
    }
}

export default scalar