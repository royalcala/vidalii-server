//user.js
module.exports = {
    schema: {
        username: () => ''
    },
    database: {
        db: 'users',
        url: 'http://localhost:4000',
        username: '',
        password: '',
        type: 'pouchdb'
    }
}

//user.facebook.js
// doesnt has database params
module.exports = {
    schema: {
        nameFacebook: () => ''
    }
}