import leaf from '../leaf'

export default leaf({
    type: 'String',
    validationType: ({ newValue }) => String(newValue)
})