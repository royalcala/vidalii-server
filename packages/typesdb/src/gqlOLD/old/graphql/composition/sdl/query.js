export default ({ storeQuery }) => ({ nameQuery, args, typeReturn }) => {
    if (storeQuery[nameQuery])
        console.log(`You have a duplicated sdl Query:${nameQuery}  and  was remplaced`)
    else
        storeQuery[nameQuery] = {}

    storeQuery[nameQuery] = {
        nameQuery,
        args,
        typeReturn
    }

}