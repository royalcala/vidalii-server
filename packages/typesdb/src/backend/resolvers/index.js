import Store from './Store'

require("glob").sync(__dirname + '/resolvers/mutations/*')
    .forEach(element => {
        console.log('element::', element)
        require(element)
    });
require("glob").sync(__dirname + '/resolvers/queries/*')
    .forEach(element => {
        console.log('element::', element)
        require(element)
    });
require("glob").sync(__dirname + '/resolvers/types/*')
    .forEach(element => {
        console.log('element::', element)
        require(element)
    });
export default Store