import { split, hasPath, path } from 'ramda'

export const defaultIndexing = listFields => {

    return {
        put: ({ key, value, preBatch }) => {
            let listPreBatchs = []
            for (let index = 0; index < listFields.length; index++) {
                let pathIndex = split('.', listFields[index])
                if (hasPath(pathIndex, value))
                    listPreBatchs.push(
                        preBatch({
                            type: 'put',
                            key: listFields[index],
                            value: key
                        })
                        //     {
                        //     type: 'put',
                        //     // key: listFields[index].concat('!!', path(pathIndex, value)),
                        //     key:preBatch(),
                        //     value
                        // }
                    )
            }

            return listPreBatchs
        },
        del: (key, value) => {

        },
        get: (key, value) => {

        }
    }
}