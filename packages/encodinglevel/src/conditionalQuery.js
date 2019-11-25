import { cond, ifElse, allPass, propEq } from 'ramda'
import mergeWithDefaultOptions from './mergeWithDefaultOptions.js'

const conditionalQuery = ({ dbWithReaderP, options, keyEncoding, valueEncoding }) => {
    let mergedOptions = mergeWithDefaultOptions({
        options,
        keyEncoding
    })
    return ifElse(
        propEq('encode', true),
        cond([
            [
                allPass([propEq('keys', true), propEq('values', true)]),
                merOpt => dbWithReaderP({
                    ...merOpt,
                    onData: data => merOpt.onData({
                        key: keyEncoding.decode(data.key),
                        value: valueEncoding.decode(data.value)
                    })
                })
            ],
            [
                allPass([propEq('keys', true), propEq('values', false)]),
                merOpt => dbWithReaderP({
                    ...merOpt,
                    onData: data => merOpt.onData(keyEncoding.decode(data))
                })
            ],
            [
                allPass([propEq('keys', false), propEq('values', true)]),
                merOpt => dbWithReaderP({
                    ...merOpt,
                    onData: data => merOpt.onData(valueEncoding.decode(data))
                })
            ]
        ]),
        merOpt => dbWithReaderP(merOpt)
    )(mergedOptions)
}

export default conditionalQuery