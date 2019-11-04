export default ({ db, search }) => new Promise((resolve, reject) => {
    var store = []
    db.createReadStream(search)
        .on('data', function (data) {
            // console.log(data.key, '=', data.value)
            store.push(data)
        })
        .on('error', function (err) {
            console.log('Oh my!', err)
        })
        .on('close', function () {
            // console.log('Stream closed')
            resolve(store)
        })
        .on('end', function () {
            // console.log('Stream ended')
        })

})