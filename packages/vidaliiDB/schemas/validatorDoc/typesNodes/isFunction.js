module.exports = isFunction

// function isFunction({ key, transformation, value, prevDoc, newDoc }) {

//     return transformation({ nameField: key, newValue: value, prevDoc, newDoc })
// }

function isFunction({ key, transformation, value, prevDoc, newDoc }) {
    const { fx, type, isNodeType, } = transformation        
    return fx({ nameField: key, newValue: value, prevDoc, newDoc })
}
