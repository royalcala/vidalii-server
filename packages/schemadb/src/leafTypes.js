import leaf from './leaf'

export const int = leaf({
    type: 'Int',
    validationType: ({ newValue }) => {
        let parse = parseInt(newValue, 10)
        if (isNaN(parse))
            return 0
        else
            return parse
    }
})
export const string = leaf({ type: 'String' })
