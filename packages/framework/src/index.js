import { loadFiles } from "./graphql/service/tools/loadPath";
import { reducer } from "./graphql/service/tools/reducerPaths";
const fs = require('fs-extra')
console.log('In @vidalii/framework')

export const scalars = () => loadFiles(__dirname + '/graphql/scalars/*.js')
export const directives = () => loadFiles(__dirname + '/graphql/directives/*.js')



export const startProyect = ({sdls = []}) => {    
    const Sdl = reducer(sdls)
    console.log('%cSdl:', 'color: #807160', Sdl);

}