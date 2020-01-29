import Store from '../Store'
export default Store.add`
extend enum TypesFields{
   REF
   INT
   STRING
   UUID
}
extend input Field_add{
   name:String
   _id_Schema:ID

}
extend type Field{
   _id:ID
   name:String
   _id_Schema:ID
   schema:Schema
   type:TypesFields
}

extend type Mutation{
   field_add(input:Connection_add):Connection    
}
`