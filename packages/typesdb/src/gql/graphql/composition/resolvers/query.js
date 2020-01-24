export default ({ storeQuery }) => ({ nameQuery, resolver }) => {
    if (storeQuery[nameQuery])
        console.log(`You have a duplicated resolver.queryu:${nameQuery} and was remplaced`)
    storeQuery[nameQuery] = resolver


}