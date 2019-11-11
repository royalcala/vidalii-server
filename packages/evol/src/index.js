// import evol from './fxs/evol'
// // import readInstalled from './readAllFxs'
// // import {a} from './readAllFxs'
// // var dir = readInstalled(__dirname + '/fxs')


// // console.log('in @vidalii/evol:', dir)
// // console.log('in @vidalii/evol:', a)

// export default {
//     evol
// }
//https://javascript.info/modules-dynamic-imports
//this page will load on client, 
//and after that, each export until if its required
export { default as evol } from "./fxs/evol"
export { default as evolPipe } from "./fxs/evolPipe"
export { default as evolCompose } from "./fxs/evolCompose"
// console.log('in @vidalii/evol')
// const cond_typedb = async () => {
//     // https://v8.dev/features/dynamic-import
//     // toLower(tableConfig.typeDb)
//     // const moduleSpecifier = './utils.mjs';
//     // const moduleSpecifier = toLower('./' + tableConfig.typeDb + '.js')
//     // console.log('moduleSpecifier::', moduleSpecifier)
//     const module = await import('./fxs/evol')
//     console.log('module::', module.default)

//     // module.default();
//     // → logs 'Hi from the default export!'
//     // module.doStuff();
//     // → logs 'Doing stuff…'

// }
// cond_typedb()