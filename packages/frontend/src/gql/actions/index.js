import gql from 'graphql-tag';


export const SESSION_GET = gql`
{
  session_get @client{
      token 
      username 
  }
}
`;

export const SESSION_SET = gql`
{
  session_set @client{
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
