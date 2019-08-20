// const { ID } = require('../toPackage/myschema/types')


const schema = {
    id: {
        type: 'ID',
        validationInsert: () => {

        },
        default: () => {
            return 'idMachine+idTime+increment'
        },
        validationUpdate: () => { }
    },
    username: {
        type: 'String',

    }

}

module.exports = {
    schema
}