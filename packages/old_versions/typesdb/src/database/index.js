const uuidv1 = require('uuid/v1')
const users = [{
    id: uuidv1(),
    username: 'alcala.rao@gmail.com',
    password: "1"
}]

const model = (table) => {
    return {
        find: (key, value) => table.find(element => element[key] === value),
        insertOne: (data) => {
            data.id = uuidv1()
            let index = table.push(data)
            return table[index - 1]
        },
        getAll: () => table
    }
}

export default {
    users: model(users)
}