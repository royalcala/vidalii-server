const uuid = require('uuid/v1');
const SEPARATOR = '_'
const iterateChildren = ({ iterateManyDocs, childrenDocs, parent_id }) => {
    for (let index = 0; index < childrenDocs.length; index++) {
        if (childrenDocs[index].hasOwnProperty('_insert'))
            if (childrenDocs[index].parent_id === null ||
                childrenDocs[index].parent_id === undefined
            ) {
                childrenDocs[index].parent_id = parent_id
            }

        iterateManyDocs(childrenDocs[index])
    }
}

const iterateOneDoc = ({ iterateManyDocs, tableName, dataDoc, schema, crud }) => {
    let dataToMutate = {}
    let key
    let dataToMutateIsEmpty = true
    // let childrenDocs = []
    const { _id, parent_id = null, ...otherData } = dataDoc
    for (key in otherData) {
        if (schema[key].hasOwnProperty('vidaliiLeaf')) {
            dataToMutate[key] = otherData[key]
            dataToMutateIsEmpty = false
        } else if (typeof schema[key] === 'object') {
            //if is array
            // let childrenDoc = otherData[key]
            // if (!childrenDoc.hasOwnProperty('parent_id'))
            //     childrenDoc.parent_id = otherData._id

            iterateManyDocs({
                crud,
                schema: schema[key],
                tableName: tableName + SEPARATOR + key,
                newDoc: otherData[key],
                // type: 'extended',
                parent_id: _id
            })
            // childrenDocs.push({
            //     crud,
            //     schema: schema[key],
            //     tableName: key,
            //     newDoc: dataDoc[key],
            // })

        }
    }
    return {
        dataToMutate,
        dataToMutateIsEmpty,
        childrenDocs
    }
}

const iterateManyDocs = async ({ crud, schema, tableName, newDoc, parent_id = null }) => {
    if (!Array.isArray(newDoc)) {
        newDoc = [newDoc]
    }


    for (let index = 0; index < newDoc.length; index++) {

        let {
            _id = null,
            _action = 'insert',
            ...dataDoc
        } = newDoc[index]
        if (_id === null && _action === 'insert')
            dataDoc['_id'] = uuid()

        const {
            dataToMutate,
            dataToMutateIsEmpty,
        } = iterateOneDoc({ iterateManyDocs, tableName, dataDoc, schema, crud })

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


        iterateChildren({ iterateManyDocs, childrenDocs, parent_id: _id })
        // return {
        //     error: 'No property crud found, please specified one:_insert,_update,_del',
        //     data: null
        // }
    }//for batch insert
    // let response = await insert.exec()
    // console.log('response::', response)
}


export default iterateManyDocs