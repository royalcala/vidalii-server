import getDirectives from "./extract.directives";
import getDirectivesArgs from "./init.directives.args";
const typeDefs = `
    type Hola@directive1{
    a(h:String @directive2):String @directive3 @directive1 @connect(model:"site") 
    }
    type Hola2{
        a:String @connect(model:"site2")
    }
    input Hola3 @directive5{
        a:String @directive6
    }
    enum HOla4 @directive7{
        ARROYO @directive8 @directive9
        PALMAS @directive10
    }
    type Query{
        a(a:String @directive11):String @directive12        
    }
    type Mutation{
        a(a:String @directive13):String @directive14
    }
    extend type Hola{
        a(a:String @directive15):String @directive16
    }
`


const directives = getDirectives(typeDefs)
//*-download gql.directive[name]

console.log('%c', 'color: #00a3cc', directives);
const directivesArgs = getDirectivesArgs(directives)
console.log('%cdirectivesArgs:', 'color: #e50000', directivesArgs);

