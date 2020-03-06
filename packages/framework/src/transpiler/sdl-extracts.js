const { parse, visit } = require("@graphql/language");
//https://graphback.dev/blog/2019/07/10/using-visitor
//https://graphql-code-generator.com/docs/custom-codegen/using-visitor
//https://spec.graphql.org/draft/
//https://codesandbox.io/s/graphql-tests-1tbss

export const sdlExtract = (ast = {}) => {
    const directives = [] //[[dir1,]]
    visit(ast, {
        leave: {
            Directive: node => {
                // const args = node.arguments.map(
                //     arg => [arg.name.value, arg.value.value]
                // )
                const args = node.arguments.reduce(
                    (acc, arg) => ({
                        ...acc,
                        [arg.name.value]: arg.value.value
                    }),
                    {}
                )
                directives.push([node.name.value, args])
                // if (!directives[node.name.value])
                //     directives[node.name.value] = {
                //         args: []
                //     }

                // node.arguments.forEach(arg => {
                //     if (!directives[node.name][arg.name.value])
                //         directives[node.name][arg.name.value] = []
                //     directives[node.name][arg.name.value].push(arg.value.value)
                // });
                // directives.push({ [node.name]: { ...args } })

            }
        }
    });

    return {
        directives
    }
}
// const visitor = {
//     Name: (node, key, parent, path, ancestors) => {
//       log("in Name:");
//       log("node:", JSON.stringify(node));
//       log("key", key);
//       log("parent", parent);
//       log("path", path);
//       log("ancestors", ancestors);
//       return node.value;
//     },
//     NamedType: node => {
//       // console.log(node)
//       return {
//         type: node.name, //returns the value
//         isNull: true
//       };
//     },
//     NonNullType: node => {
//       return {
//         //spread returned object from NamedType
//         ...node.type,
//         isNull: false
//       };
//     },
//     FieldDefinition: (node, key, parent, path, ancestors) => {
//       log("in fieldDefinition:");
//       log("node:", JSON.stringify(node));
//       log("key", key);
//       log("parent", parent);
//       log("path", path);
//       log("ancestors", ancestors);    
//       return {
//         //spread returned object from NamedType or NotNullType
//         ...node.type,
//         name: node.name
//       };
//     },
//     Directive: (node, key, parent, path, ancestors) => {
//       log("in Directive:");
//       log("node:", JSON.stringify(node));
//       log("key", key);
//       log("parent", parent);
//       log("path", path);
//       log("ancestors", ancestors);    
//       return {
//         //spread returned object from NamedType or NotNullType
//         ...node.type,
//         name: node.name
//       };
//     },
//     DirectiveDefinition: node => {
//       console.log("DirectiveDefinition:", JSON.stringify(node));
//       return {
//         //spread returned object from NamedType or NotNullType
//         ...node.type,
//         name: node.name
//       };
//     },
//     ObjectTypeDefinition: node => {
//       return {
//         name: node.name,
//         fields: node.fields
//       };
//     }
//   };
// import getDirectives from "./extract.directives";
// import getDirectivesArgs from "./init.directives.args";
// const typeDefs = `
//     type Hola@directive1{
//     a(h:String @directive2):String @directive3 @directive1 @connect(model:"site") 
//     }
//     type Hola2{
//         a:String @connect(model:"site2")
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

// const directives = getDirectives(typeDefs)
// //*-download gql.directive[name]

// console.log('%c', 'color: #00a3cc', directives);
// const directivesArgs = getDirectivesArgs(directives)
// console.log('%cdirectivesArgs:', 'color: #e50000', directivesArgs);

