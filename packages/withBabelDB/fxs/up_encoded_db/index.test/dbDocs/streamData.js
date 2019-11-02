export default ({ db, docsTest = [] }) => new Promise((resolve, reject) => {
    var size = 0
    db.createReadStream()
        .on('data', function (data) {
            // console.log(data.key, '=', data.value)
            size += 1
        })
        .on('error', function (err) {
            console.log('Oh my!', err)
        })
        .on('close', function () {
            // console.log('Stream closed')
            resolve(size)
        })
        .on('end', function () {
            // console.log('Stream ended')
        })

})