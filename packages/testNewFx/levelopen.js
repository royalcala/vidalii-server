const close = (db, options = {}) => new Promise((resolve, reject) => {
    db.close((err) => {
        if (err)
            reject(err)
        else
            resolve(true)
    })
})
const open = (db, options = {}) => new Promise((resolve, reject) => {
    db.open(options, (err) => {
        if (err)
            reject(err)
        else
            resolve(true)
    })
})



const tryOpenDB = async db => {
    try {
        responseOpen = await open(db)
        return ({
            db,
            error: null
        })
    } catch (error) {
        try {
            responseClose = await close(db)
            try {
                responseOpen = await open(db)
                return ({
                    db,
                    error: null
                })
            } catch (error) {
                return ({ error })
            }
        } catch (error) {
            return ({ error })
        }
    }
}
const timer = ms => new Promise(res => setTimeout(res, ms));

const openingWithLoop = async db => {
    let opened_db
    console.log('Trying to open the database.')
    while (true) {
        opened_db = await tryOpenDB(db)
        if (db.error)
            await timer(1000)
        else
            break
    }
    console.log('Database was Opened.')
}

const main = (location, options = {}) => async typeDB => {
    let db = await openingWithLoop(typeDB(location, options))
    return {
        close: () => db.close(),
       
    }
}


let leveldown = require('leveldown')
main('./mydb')(leveldown)

// startdb(leveldown)
// async function startdb(db, ) {



//     const db = leveldown()

//     console.log('db::', db)

//     let responseClosed = await closeDB(db)
//     console.log('responseClosed::', responseClosed)

// }