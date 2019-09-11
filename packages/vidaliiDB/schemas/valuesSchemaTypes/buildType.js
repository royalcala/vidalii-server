module.exports = ({ nameFile, fx, type = null }) => {
    let node = {}

    if (type === null) {
        throw new Error('You must to specificate the type of the Node Validator in ' + nameFile + '.js')
    }
    node.type = type
    node.fx = fx
    
    node.isNodeType = true
    return node
}

