const R = require('ramda')

// const dataTypes = []

// const isFx = ({ typesDef, numType, childNode }) => typesDef[numType].push(childNode.name)


// const ifArray = [R.is(Array), () => 'isArray']
// const ifObj = [R.is(Object), () => '']
// const ifFx = ({ childNode }) => R.is(Function, childNode)



// const isObj = ({ nameType, schemaType }) => R.pipe(
//     R.toPairs,
//     R.reduce((acc, [nameNode, valueNode]) => {

//         return condNode(valueNode)
//     }, null)
// )(schemaType)

const firstUpper = R.pipe(
    R.trim,
    R.splitAt(1),
    ([first, rest]) => R.concat(R.toUpper(first), R.toLower(rest))

)

const condNode = ({ oTypesDef, nameType = null, childNode }) => {



    Object.entries(childNode).map(([name, node]) => {
        console.log('next Map', name)
        if (R.is(Function, node)) {
            oTypesDef[nameType] = `${oTypesDef[nameType]} ${name}:${node.type}`

        } else {
            if (nameType === null) {
                let upName = firstUpper(name)
                oTypesDef[upName] = `Type ${upName} {`
                condNode({ oTypesDef, nameType: upName, childNode: node })
            } else {
                let upName = `${nameType}_${firstUpper(name)}`
                oTypesDef[nameType] = `${oTypesDef[nameType]} ${name}:${upName}`
                oTypesDef[upName] = `Type ${upName} {`
                condNode({ oTypesDef, nameType: upName, childNode: node })
            }



        }

    })
    if (nameType) {
        oTypesDef[nameType] = oTypesDef[nameType] + '}'
    }



}


function main(schemas) {
    // var typesDef = []
    // var numType = 0
    var oTypesDef = {}


    condNode({ oTypesDef, childNode: schemas })
 
    return oTypesDef
}




module.exports = main 