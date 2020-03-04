import gql from '@graphql-tag'

const insertDirectiveArgs = (storeDirArgs, arrayArgs) => {
    arrayArgs.forEach(arg => {
        if (!storeDirArgs[arg.name.value])
            storeDirArgs[arg.name.value] = {
                [arg.value.value]: ''
            }
        else
            storeDirArgs[arg.name.value] = {
                ...storeDirArgs[arg.name.value],
                [arg.value.value]: ''
            }
    })
}


const insertDirective = (storeDirectives, arrayDirectives, storeDirArgs) => {
    arrayDirectives.forEach(directive => {
        // storeDirectives.set(directive.name.value,null);
        storeDirectives[directive.name.value] = ''
        insertDirectiveArgs(storeDirArgs, directive.arguments)

    })
}
const searchDirectives = ast => {
    // const storeDirectives = new storeDirectives();
    const storeDirectives = {}
    const storeDirArgs = {}
    ast.definitions.forEach(objType => {
        insertDirective(storeDirectives, objType.directives, storeDirArgs)
        if (objType.fields)
            objType.fields.forEach(field => {
                if (field.arguments)
                    field.arguments.forEach(arg => {
                        insertDirective(storeDirectives, arg.directives, storeDirArgs)
                    })
                insertDirective(storeDirectives, field.directives, storeDirArgs)
            })
        //enum
        if (objType.values)
            objType.values.forEach(value => {
                insertDirective(storeDirectives, value.directives, storeDirArgs)
            })
    })
    return {
        directives: storeDirectives,
        directivesArgs: storeDirArgs
    }
}
const getDirectives = typeDefs => {
    return searchDirectives(gql(typeDefs))

}

export default getDirectives