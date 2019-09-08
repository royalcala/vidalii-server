module.exports = isFunction

function isFunction({ transformation, value, prevDoc, newDoc }) {

    return transformation({ newValue: value, prevDoc, newDoc })
}
