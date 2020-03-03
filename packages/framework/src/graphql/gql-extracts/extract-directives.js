import gql from '@graphql-tag'
// const { log } = console
// const ast = gql`
//     type Hola@directive1{
//     a(h:String @directive2):String @directive3 @directive1
//     }
//     type Hola2{
//         a:String @directive4
//     }
//     input Hola3 @directive5{
//         a:String @directive6
//     }
//     enum HOla4 @directive7{
//         ARROYO @directive8 @directive9
//         PALMAS @directive10
//     }
//     type Query{
//         a(a:String @directive11):String @directive12        
//     }
//     type Mutation{
//         a(a:String @directive13):String @directive14
//     }
//     extend type Hola{
//         a(a:String @directive15):String @directive16
//     }
// `

// log(ast)
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

const extractFromArguments = ''
// log('directives::', getDirectives(ast))

export default getDirectives