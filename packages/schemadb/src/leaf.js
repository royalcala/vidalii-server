import { pipe } from 'ramda'
export const vidaliiLeaf = 'vidaliiLeaf'
export default ({
    type,
    validationType
}) => (
    {
        insert = ({ newValue }) => ({ newValue }),
        update = x => x
    } = {}) => ({
        [vidaliiLeaf]: true,
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