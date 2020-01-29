import Store from './Store'
// import Connection from './Defs/Connection'
// import Schema from './Defs/Schema'
// import Field from './Defs/Field'
const fs = require('fs');
require("glob").sync(__dirname + '/Defs/*.graphql')
    .forEach(Path => {
        Store.add(
            fs.readFileSync(Path, 'utf8').toString()
        )
    });
// console.log('Store.getStore()::',Store.getStore())
export default Store