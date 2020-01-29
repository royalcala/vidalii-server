export default data => {
    if (Array.isArray(data) || typeof data !== 'object') {
        return {
            props: Array.isArray(data) ? data : [data],
            index: null,
            unique: null,
            insert: ({ newValue }) => newValue,
            update: ({ newValue }) => newValue
        }
    } else {
        const {
            props = null,
            index = null,
            unique = null,
            insert = ({ newValue }) => newValue,
            update = ({ newValue }) => newValue
        } = data
        return {
            props,
            index,
            unique,
            insert,
            update
        }
    }
}