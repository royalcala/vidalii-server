
export default ({ name, db, oTypesDef }) => {
    let queries = []
    let resolvers = []
    let key
    let tableName
    let first = true
    for (key in oTypesDef) {
        if (first === true) {
            tableName = 'root'
            first = false
        } else {
            tableName = key.split("_").pop()
        }
        let nameSet = `select_${key}`
        queries.push({
            query: `${nameSet}:[${key}]`,
            resolver: {
                name: nameSet,
                fx: (operators = {}) => {
                    let query = db
                    Object.entries(operators).forEach(
                        ([operator, values]) => {
                            query = query[operator](...values)
                        })
                    query = query.select('*').from(tableName)

                }
            }
        })
    }
    return {
        str: '',
    }
}