export default ({ storeMutation }) => ({ nameMutation, args = null, typeReturn }) => {
    if (storeMutation[nameMutation])
        console.log(`You have a duplicated sdl Mutation:${nameMutation} and  was remplaced`)
    else
        storeMutation[nameMutation] = {}

    storeMutation[nameMutation] = {
        // nameMutation,
        args,
        typeReturn
    }

}