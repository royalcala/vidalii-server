//@flow
import * as R from 'ramda'
const fs = require('fs-extra')

/*::
type MyAlias = {
  foo: number,
  bar: boolean,
  baz: string,
};
type MyAlias2 = () => any;
*/


// function foo(x: ?string): string {
//     return "default string";
// }
function foo2(x/*: MyAlias */) /*: MyAlias */ {
    return {
        foo: 1,
        bar: true,
        baz: 's'
    }
}
function foo(x/*: MyAlias2 */) /*: MyAlias2 */ {
    return ()=>{return 'a'}
}

// function foo3(x/*: MyAlias */) /*: MyAlias */ {
//     return {
//         foo: 1,
//         bar: true,
//         baz: 's'
//     }
// }
