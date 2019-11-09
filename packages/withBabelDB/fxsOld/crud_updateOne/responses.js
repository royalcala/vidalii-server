export const revError = ({ standarizedResponse, _rev }) => standarizedResponse({
    error: {
        msg: `Error. The _rev:${_rev} was not the correct`
    }
})
export const IdNotFound = ({ standarizedResponse, _id }) => standarizedResponse({
    error: {
        msg: `Error.The id:${_id} was not found`
    }
})

export const queueInUse = ({ standarizedResponse, _id, _rev }) => standarizedResponse({
    error: {
        msg: `Error.The _id:${_id} with _rev:${_rev} is in process of Update. Please get the newest _rev`
    }
})