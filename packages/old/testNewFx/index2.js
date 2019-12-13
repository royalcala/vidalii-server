import { ifElse, pathEq } from 'ramda'


export const index2 = ifElse(
    pathEq(['one', 'two'], true),
    pipe(
        x => true
    ),
    pipe(
        x => false
    )
)