import { pipe } from 'ramda'
export default ({
    type,
    validationType
}) => (
    {
        insert = ({ newValue }) => ({ newValue }),
        update = x => x
    } = {}) => {
        // console.log('insert::',insert,type)    
        return {
            vidaliiLeaf: true,
            type,
            insert: pipe(
                insert,
                validationType
            ),
            update
        }
    }