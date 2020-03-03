const jwt = require('@jsonwebtoken')
const getUser = token => {
    try {
        if (token) {
            return jwt.verify(token, process.env.JWT_SECRET)
        }
        return null
    } catch (err) {
        console.log('Erro jwt verification.', err);
        return null
    }
}

export default ({ req }) => {
    const tokenWithBearer = req.headers.authorization || ''
    const token = tokenWithBearer.split(' ')[1]
    const user = getUser(token)

    return {
        user
    }
}