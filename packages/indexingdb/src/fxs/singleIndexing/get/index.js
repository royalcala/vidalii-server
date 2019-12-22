import indexData from './indexData'
import docsData from './docsData'


export default async ({ docsdb, indexdb, get = {} }) => {
    let indexDataFound = await indexData({ indexdb, get })
    let docsFound = await docsData({ indexDataFound, docsdb, get })    
    return docsFound
}