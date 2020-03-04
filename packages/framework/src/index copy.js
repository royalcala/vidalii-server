import { loadFiles } from "./graphql/service/tools/loadPath";
const fs = require('fs-extra')
console.log('In @vidalii/framework')

export const scalars = () => loadFiles(__dirname + '/graphql/scalars/*.js')
export const directives = () => loadFiles(__dirname + '/graphql/directives/*.js')

