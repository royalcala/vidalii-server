import { split, path } from 'ramda'

export default listFields => ({ key, value, preBatch }) => {
    let listPreBatchs = []
    for (let index = 0; index < listFields.length; index++) {
        let pathIndex = split('.', listFields[index])
        let valueOfIndex = path(pathIndex, value)
        if (valueOfIndex !== undefined) {
            listPreBatchs.push(
                preBatch([{
                    type: 'put',
                    key: {
                        nameField: listFields[index],
                        valueField: valueOfIndex,
                        idDoc: key
                    },
                    value: {}
                }])[0]
            )
        }

    }
    return listPreBatchs
}