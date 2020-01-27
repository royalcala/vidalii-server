import { SEPARATOR } from '../../CONSTANTS'
const resolveNameDB = nameType => {
    let name = nameType.split(SEPARATOR)
    name[0] = 'root'
    return name.join('_')
}
export const searchInSubTable = ({ oGraphql, nextNameType, db }) => {
    const nameTable = resolveNameDB(nextNameType)
    oGraphql.resolvers.types.push({
        path: nextNameType.split(SEPARATOR),
        fx: async (parent, args = {}, context, info) => {
            let concatQuery = db
            concatQuery = concatQuery.where({ parent_id: parent._id })
            Object.entries(args).forEach(
                ([operator, values]) => {
                    concatQuery = concatQuery[operator](...values)
                })           
            let results = await concatQuery.select('*').from(nameTable)            
            return results
        }
    })
}

export const searchInTable = ({ oGraphql, nameType, db }) => {
    const nameTable = resolveNameDB(nameType)
    oGraphql.queries.push({
        sdl: `${nameType}:[${nameType}]`
    })    
    oGraphql.resolvers.queries.push({
        [nameType]: async (parent, args = {}, context, info) => {            
            let query = db
            Object.entries(args).forEach(
                ([operator, values]) => {
                    query = query[operator](...values)
                })
            let results = await query.select('*').from(nameTable)
            return results

        }
    })
}