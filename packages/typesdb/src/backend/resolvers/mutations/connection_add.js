import Store from '../index'

Store.add(
    'mutations',
    'connection_add',

)
module.exports = {
    version: '1.0.0',
    type: 'mutation',
    fx: (parent, args, context, info) => {

    }
}