



const typesString = typesObject => {
    let str = ''
    let key
    for (key in typesObject) {
        str = str.concat(`type ${key}{\n`)
        typesObject[key].forEach(e => {
            str = str.concat(`${e.name}:${e.type}\n`)
        })
        str = str.concat(`}\n`)
    }
    return str
}

const typesObject = ({ nameType, schema, typesObj }) => {
    typesObj[nameType] = []
    let key
    for (key in schema) {
        if (schema[key].hasOwnProperty('vidaliiLeaf')) {
            typesObj[nameType].push({
                name: key,
                type: schema[key].types.graphql
            })
        } else if (typeof schema[key] === 'object') {
            typesObj[nameType].push({
                name: key,
                type: `[${nameType}_${key}]`
            })
            typesObject({
                nameType: `${nameType}_${key}`,
                schema: schema[key],
                typesObj
            })
        }
    }

}

export default ({ name, schema }) => {
    let resultTypesObject = {}
    typesObject({ nameType: name, schema, typesObj: resultTypesObject })
    console.log('resultTypesObject::', resultTypesObject)
    let resultTypesString = typesString(resultTypesObject)
    console.log('resultTypesString::', resultTypesString)
    // console.log('1::', gql(sdlTypes).definitions[0])
    return {
        obj: resultTypesObject,
        string: resultTypesString
    }
  
}