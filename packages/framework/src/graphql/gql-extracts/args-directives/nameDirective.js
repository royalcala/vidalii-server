import gql from '@graphql-tag'

const insertDirective = (store, arrayDirectives) => {
    arrayDirectives.forEach(directive => {
        // store.set(directive.name.value,null);
        store[directive.name.value] = {}
    })
}
const searchDirectives = ast => {
    // const store = new store();
    const store = {}
    ast.definitions.forEach(objType => {
        insertDirective(store, objType.directives)
        if (objType.fields)
            objType.fields.forEach(field => {
                if (field.arguments)
                    field.arguments.forEach(arg => {
                        insertDirective(store, arg.directives)
                    })
                insertDirective(store, field.directives)
            })
        //enum
        if (objType.values)
            objType.values.forEach(value => {
                insertDirective(store, value.directives)
            })
    })
    return store
}
const getDirectives = ast => {
    const directives = searchDirectives(ast)
    return directives
}