import { loadModules } from "./graphql/service/tools/loadPath";
const fs = require('fs-extra')
console.log('In @vidalii/framework')

export const scalars = () => loadModules(__dirname + '/graphql/scalars/*.js')
export const directives = () => loadModules(__dirname + '/graphql/directives/*.js')
