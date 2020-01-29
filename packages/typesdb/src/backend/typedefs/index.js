import Store from './Store'
// import Connection from './Defs/Connection'
// import Schema from './Defs/Schema'
// import Field from './Defs/Field'
require("glob").sync(__dirname + '/Defs/*')
    .forEach(element => {
        require(element)
    });
// console.log('Store.getStore()::',Store.getStore())
export default Store