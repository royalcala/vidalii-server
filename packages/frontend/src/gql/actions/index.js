import gql from 'graphql-tag';

export const SESSION_GET = gql`
query session_get{
  session_get @client{
      token 
      username 
  }
}
`;
// export const SESSION_GET = gql`
// query session_get{
//   session_get @client{
//       token 
//       username 
//   }
// }
// `;

export const SESSION_SET = gql`
mutation session_set($username: String! $password:String!) {
session_set(username:$username password:$password) @client{
  token
  username
}
}
`
// export const HAS_SESSION = gql`
//   query IsUserLoggedIn {
//     isLoggedIn @client
//     hola @client
//   }
// `;
// export const GET_CART_ITEMS = gql`
// query GetCartItems {
//   cartItems @client
// }
// `;
