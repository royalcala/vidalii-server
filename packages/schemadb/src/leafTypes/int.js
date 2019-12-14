import leaf from '../leaf'

export default leaf({
    type: 'Int',
    validationType: ({ newValue }) => {
        let parse = parseInt(newValue, 10)
        if (isNaN(parse))
            return 0
        else
            return parse
    }
})