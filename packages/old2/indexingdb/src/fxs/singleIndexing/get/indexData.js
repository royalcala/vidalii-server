import { ifElse, hasPath } from 'ramda'

export default async ({ indexdb, get }) => {
    let indexDataFound = []
    await indexdb.iteratorP({
        onData: row => indexDataFound.push(row),
        values: false,
        start: {
            nameField: get.where.field,
            valueField: ifElse(
                hasPath(['where', 'start']),
                () => get.where.start,
                () => ''
            )(get),
            idDoc: ''
        },
        end: {
            nameField: get.where.field,
            valueField: ifElse(
                hasPath(['where', 'end']),
                () => get.where.end,
                () => '\xFF'
            )(get),
            idDoc: ''
        }
    })    
    return indexDataFound
}