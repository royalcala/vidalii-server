import reduceInsert from "./reduceInsert"
import reduceUpdate from './reduceUpdate'

export const VIDALIILEAF = 'vidaliiLeaf'

export default ({
    type,
    validationType
}) => (
    {
        insert = ({ newValue }) => newValue,
        update = ({ newValue }) => newValue
    } = {}) => {
        return {
            [VIDALIILEAF]: true,
            type,
            insert: reduceInsert(
                insert,
                validationType
            ),
            update: reduceUpdate(
                update,
                validationType
            )
        }
    }