//@flow
import * as R from 'ramda'
const fs = require('fs-extra')


function foo(x: ?number): string {
    if (x) {
        //   return x;
    }
    return "default string";
}