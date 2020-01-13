import codecs from './codecs'
import preBatchPut from './put'
import get from './get'

export default listFields => {

    return {
        codecs,
        put: preBatchPut(listFields),
        get,
        del: (key, value) => {

        },
    }
}