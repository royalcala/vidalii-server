
const getNameTable = firstTableName => {

    return {
        get: () => {
            return ''
        }
    }
}

export default ({ name, db, oTypesDef }) => {
    let queries = []
    let resolvers = []
    let key
    let tableName
    let first = true
    for (key in oTypesDef) {
        if (first === true) {
            tableName = 'root'
        } else {
            tableName = key.split("_").pop()
        }

        queries.push({
            query: `select_${key}:[${key}]`,
            resolver: ''
        })
    }
    db.select('title', 'author', 'year').from('books')
    return {
        str: '',
    }
}