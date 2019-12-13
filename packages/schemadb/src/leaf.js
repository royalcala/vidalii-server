export default ({ type }) => (
    {
        insert = x => x,
        update = x => x
    } = {}) => {
    // console.log('insert::',insert,type)    
    return {
        vidaliiLeaf: true,
        type,
        insert,
        update
    }
}