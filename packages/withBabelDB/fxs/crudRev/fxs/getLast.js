export default ({ input, standarizedResponse }) => {

    return ({ _id, _rev }) => new Promise((resolve, reject) => {
        //get last revision
        input.db.rev.createReadStream({
            gte: { _id, _rev },
            reverse: true,
            limit: 1
        }).on('data', function (data) {
            console.log('KEY:', data.key, '=>', 'VAlUE:', data.value)
            resolve({
                _id,
                _rev: data.key._rev,
                data: data.value
            })
        }).on('error', function (err) {
            console.log('error on rev_up_encoded_db:getLast.', err)
        }).on('close', function () {
            console.log('Stream getLast closed')
        }).on('end', function () {
            // resolve({
            //     _id,
            //     _rev: data.key._rev,
            //     data: data.value
            // })
            console.log('Stream getLast ended')
        })
    })
}