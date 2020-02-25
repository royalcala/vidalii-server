module.exports = {
    sdl: `
    type Query{
    query(model:String,query:String):String @query
    }
    type Mutation{
    insert(model:String,data:String):String
    update(model:String,data:String):String
    }
    `
}
