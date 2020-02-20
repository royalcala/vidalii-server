import gql from 'graphql-tag';

const typeDefs = gql`
extend type Session{
  token:String
  username:String
  email:String
  name:String
}
extend type Query {
  # initialData:String
  # hola:String 
  session_get:Session
}
extend type Mutation {
    session_set(username:String! password:String! ):Session 
  }
`;

export default typeDefs