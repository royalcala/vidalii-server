const GraphQLJSON = require('graphql-type-json');

module.exports = {
    sdl: `scalar JSON`,
    resolver: { JSON: GraphQLJSON }
}