const { parse, visit } = require("@graphql/language");
//https://codesandbox.io/s/graphql-tests-1tbss
const visitor = {
    // (node, key, parent, path, ancestors)
    Directive: node => {
        console.log('%cNODE::', 'color: #731d1d', node);
        
    }
};
module.exports = {
    init: (sdls = []) => {
        sdls.forEach(sdl => {
            visit(
                parse(sdl),
                { leave: visitor }
            )
        })
    }
}