import { pipe } from 'ramda'
export const VIDALIILEAF = 'vidaliiLeaf'
export default ({
    type,
    validationType
}) => (
    {
        insert = ({ newValue }) => ({ newValue }),
        update = x => x
    } = {}) => ({
        [VIDALIILEAF]: true,
        type,
        insert: pipe(
            insert,
            validationType
        ),
        update: pipe(
            update,
            validationType
        )
    })