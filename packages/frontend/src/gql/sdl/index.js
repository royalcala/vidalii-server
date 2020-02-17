import gql from 'graphql-tag';

const typeDefs = gql`
extend type Session{
  username:String
  email:String
  name:String
  token:String
}
extend type Query {
  initialData:String
  hola:String 
  session_get:Session
}
extend type Mutation {
    session_set(username:String! password:String! ):Session 
  }
`;

export default typeDefs