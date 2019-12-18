import encodingdb from '@vidalii/encodingdb'
import { json as jsoncodecs, utf8 } from '@vidalii/encodingdb/src/codecs'
import subdb from '@vidalii/subdb'
import { pipe, split, hasPath, path } from 'ramda'

const defaultIndexing = listFields => {

    return {
        put: ({ doc }) => {
            let preBatch = []
            for (let index = 0; index < listFields.length; index++) {
                let pathIndex = split('.', listFields[index])
                if (hasPath(pathIndex, doc))
                    preBatch.push({
                        type,
                        key: listFields[index].concat('!!', path(pathIndex, doc)),
                        value
                    })
            }

            return preBatch
        },
        del: ({ doc }) => {

        },
        get: ({ doc }) => {

        }
    }
}


const indexes = [
    {
        nameIndex: 'default',
        fx: defaultIndexing([
            ['folio'],
            ['spec.size']
            ['spec.color']
        ])
    }
]

//AND
//OR
//Merge IDs

const indexesFxsPipes = () => {

}
const indexCodecs = {
    keyEncoding: {
        // encode use default string/buff
        decode: utf8.keyEncoding.decode
    },
    valueEncoding: jsoncodecs.valueEncoding
}
export default ({ listIndexes, prefix }) => db => {
    const indexDB = pipe(
        subdb({ prefix }),
        encodingdb(indexCodecs),
    )(db)
    return {
        composition: {
            ...db.composition,
            indexdb: true
        },
        putPreBatch: (key, value) => {

        },
        delPreBatch: (key, value) => {

        },
        put: () => {

        },
        find: ({ query, index }) => {

        },
        del: () => {

        }
    }

}