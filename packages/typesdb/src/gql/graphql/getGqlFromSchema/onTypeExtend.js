export const onTypeExtend = ({ typeExtend, addToStore }) => {
    if (Array.isArray(typeExtend)) {
        extend.forEach(
            e => {

            }
        )
    } else {
        const { schema, key, field, relation, resolver } = typeExtend
        //if resolver is null --> use default query to database, query remote
    }
}