export default () => ({ error = null, data = null, ...otherData }) => {
    //log errors
    return {
        data,
        error,
        ...otherData
        // ...(error === null ? {} : { error })
    }
}