import { replace, pipe, reduce, assoc } from 'ramda'
import { readdirSync } from 'fs'

export default pathToRead => pipe(
    readdirSync,
    reduce(
        (acc, fileName) => assoc(
            replace('.js', '', fileName),
            require(pathToRead + '/' + fileName).default,
            acc
        )
        , {}
    )
)(pathToRead)

// export default {a:1,b:2};