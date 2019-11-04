import { cond, has } from 'ramda'

const encodingdb = ({ config }) => {
    // const { value = null, key = null } = config.env.encoding

    if (config.env.hasOwnProperty('encoding')) {
        const { value = null, key = null } = config.env.encoding

        return {
            ...(value === null ? {} : { valueEncoding: value }),
            ...(key === null ? {} : { keyEncoding: key })
        }
    } else {
        //values defaults are utf8
        return {}
    }
}

const createDirsIfNotExist = ({ pathDir, pathNameDb }) => {
    var fs = require('fs')
    if (!fs.existsSync(pathDir)) {
        fs.mkdirSync(pathDir);
    }
    if (!fs.existsSync(pathNameDb)) {
        fs.mkdirSync(pathNameDb);
    }
}
const createdb = ({ config, name }) => {

    // var levelup = require('levelup')
    //warning N-API, is here
    var leveldown = require('leveldown')
    // var encode = require('encoding-down')
    // var encoding = encodingdb({ config })
    // console.log('encoding:', encoding)
    const pathDir = config.env.nodeConfig.pathdb
    const pathNameDb = `${config.env.nodeConfig.pathdb}/${name}`

    createDirsIfNotExist({ pathDir, pathNameDb })



    return leveldown(pathNameDb)
    // levelup(
    //     encode(
    //         leveldown(pathNameDb),
    //         encoding
    //     )
    // )
}
export default ({ config }) => {

    return {
        docs: createdb({ config, name: 'docs' }),
        rev: createdb({ config, name: 'rev' }),
        seq: createdb({ config, name: 'seq' }),
        //save which sequence server is it 
        // log: createdb({ config, name: 'log' })
    }

}