import gql from 'graphql-tag';

const typeDefs = gql`
extend type Launch {
  isInCart: Boolean!
}
extend type Session{
  username:String
  name:String
  token:String
}

extend type Query {
  isLoggedIn: Boolean!
  cartItems: [ID!]!
  hola:String
  session_get:Session
}
  extend type Mutation {
    addOrRemoveFromCart(id: ID!): [ID!]!
    session_validate(username:String! password:String! ):Session
  }
`;

export default typeDefs