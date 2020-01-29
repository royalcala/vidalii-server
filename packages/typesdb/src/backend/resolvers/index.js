import Store from './Store'
require("glob").sync(__dirname + '/resolvers/*')
    .forEach(element => {
        console.log('element::',element)
        require(element)
    });
export default Store