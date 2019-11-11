export const standarizedResponse = ({ error = null, data = null }) => {
    //log errors
    return {
        data,
        error
        // ...(error === null ? {} : { error })
    }
}