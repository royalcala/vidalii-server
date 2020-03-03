const GraphQLJSON = require('@scalar-json');

module.exports = {
    sdl: `scalar JSON`,
    resolver: { JSON: GraphQLJSON },    
}