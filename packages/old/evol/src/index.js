// import * as evolComposeExtended from "./fxs/extendEvol"

// export { default as evolPipe } from "./fxs/evolPipe"
// export { default as evolCompose } from "./fxs/evolCompose"
// export { evolComposeExtended }
import { ifElse, pipe, pathEq } from 'ramda'
import { index2 } from './index2'


const obj1 = {
    one: {
        two: true
    }
}


export const index1 = ifElse(
    pathEq(['one', 'two'], true),
    pipe(index2),
    pipe(index2)
)

console.log('index2(obj1)::', index1(obj1))
