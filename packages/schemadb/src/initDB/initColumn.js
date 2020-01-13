const columnUnique = ({ col, unique }) => {
    if (unique !== null)
        return Array.isArray(unique) ?
            col.unique(...unique) :
            col.unique()
    else
        col
}
const columnIndex = ({ col, index }) => {
    if (index !== null)
        return Array.isArray(index) ?
            col.index(...index) :
            col.index()
    else
        col

}

const columnProps = ({ table, types, columnName, props }) => {
    if (props !== null)
        return Array.isArray(props) ?
            table[types.knex](columnName, ...props) :
            table[types.knex](columnName, props)
    else
        return table[types.knex](columnName)
}

export default async ({ db, tableName, vidaliiLeaf, columnName }) => {
    let existsColumn = await db.schema.hasColumn(tableName, columnName)
    if (!existsColumn) {
        await db.schema.table(tableName, table => {
            const { props, index, unique, types } = vidaliiLeaf
            let col = columnProps({ table, types, columnName, props })
            col = columnIndex({ col, index })
            col = columnUnique({ col, unique })
        })
        console.log(`Column "${columnName}" created in table "${tableName}"`)
    }
}