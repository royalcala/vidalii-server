import Store from '../Store'
export default Store.add`
extend input Schema_add{
   name:String
   _id_Connection:ID
}
extend type Schema{
   _id:ID
   name:String
   _id_Connection:ID
   connection:Connection
}
extend type Mutation{
   schema_add(input:Schema_add):Schema    
}
`