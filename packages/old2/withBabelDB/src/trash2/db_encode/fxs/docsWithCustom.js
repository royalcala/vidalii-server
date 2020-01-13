var encode = require('encoding-down')

const encodingdb = ({ config }) => {
    if (config.env.hasOwnProperty('encoding')) {
        const { value = 'json', key = null } = config.env.encoding

        return {
            // ...(value === null ? {} : { valueEncoding: value }),
            valueEncoding: value,
            ...(key === null ? {} : { keyEncoding: key })
        }
    } else {
        //values defaults are utf8
        return {
            valueEncoding: 'json'
        }
    }
}

export default ({ db, config }) => {
    var encoding = encodingdb({ config })
    return encode(db.docs, encoding)
}