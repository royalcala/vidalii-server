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
