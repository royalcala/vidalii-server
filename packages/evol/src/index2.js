import { ifElse, pipe, pathEq } from 'ramda'


export const index2 = ifElse(
    pathEq(['one', 'two'], true),
    pipe(x => 'isTrue'),
    pipe(x => 'isFalse')
)