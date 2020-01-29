import Store from '../Store'
export default Store.add`
extend enum Orm {
    KNEX
    TYPEORM    
  }
extend input Connection_add{
name:String
type:String
database:String
orm:Orm
}
extend type Connection{
    _id:ID
    name:String
    type:String
    database:String
    orm:Orm
}

extend type Mutation{
    connection_add(input:Connection_add):Connection    
}
`