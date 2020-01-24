export default ({ storeMutation }) => ({ nameMutation, resolver }) => {
    if (storeMutation[nameMutation])
        console.log(`You have a duplicated resolver.mutation:${nameMutation} and was remplaced`)
    storeMutation[nameMutation] = resolver


}