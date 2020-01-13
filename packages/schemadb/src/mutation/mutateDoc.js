const mutationChildrenTables = ({ mutationDocumentTable, childrenDocs, parent_id }) => {
    for (let index = 0; index < childrenDocs.length; index++) {
        if (childrenDocs[index].hasOwnProperty('_insert')) {
            childrenDocs[index].parent_id = parent_id
        }
        mutationDocumentTable(childrenDocs[index])
    }
}

const filterDataToMutate = ({ dataDoc, schema, crud }) => {
    let dataToMutate = {}
    let key
    let dataToMutateIsEmpty = true
    let childrenDocs = []
    for (key in dataDoc) {
        if (schema[key].hasOwnProperty('vidaliiLeaf')) {
            dataToMutate[key] = dataDoc[key]
            dataToMutateIsEmpty = false
        } else if (typeof schema[key] === 'object') {
            childrenDocs.push({
                crud,
                schema: schema[key],
                tableName: key,
                newDoc: dataDoc[key],
            })

        }
    }
    return {
        dataToMutate,
        dataToMutateIsEmpty,
        childrenDocs
    }
}

const mutationDocumentTable = async ({ crud, schema, tableName, newDoc }) => {
    if (!Array.isArray(newDoc)) {
        newDoc = [newDoc]
    }


    for (let index = 0; index < newDoc.length; index++) {

        let {
            _id = null, parent_id = null,
            _action = 'insert',
            // _insert = null,
            // _update = null, _del = null,
            ...dataDoc
        } = newDoc[index]
        const {
            dataToMutate,
            dataToMutateIsEmpty,
            childrenDocs
        } = filterDataToMutate({ dataDoc, schema, crud })

        if (!dataToMutateIsEmpty) {
            switch (_action) {
                case 'insert':
                    _id = crud.insert.add({ tableName, _id, parent_id, data: dataToMutate })
                    break;
                case 'update':
                    crud.update.add({ tableName, _id, data: dataToMutate })
                    break;
            }
        }
        if (_action === 'del') {
            crud.del.add({ tableName, _id })
        }


        mutationChildrenTables({ mutationDocumentTable, childrenDocs, parent_id: _id })
        // return {
        //     error: 'No property crud found, please specified one:_insert,_update,_del',
        //     data: null
        // }
    }//for batch insert
    // let response = await insert.exec()
    // console.log('response::', response)
}


export default mutationDocumentTable