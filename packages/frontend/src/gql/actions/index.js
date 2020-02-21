import gql from 'graphql-tag';


export const UI_LOADING_BACKDROP = gql`
query ui_loading_backdrop{
  ui_loading_backdrop
}
`

export const SESSION_GET_TOKEN = gql`
query cacheToken{  
  token
}`



export const SESSION_GET = gql`
query session_get($username:String $password:String){
  session_get(username:$username password:$password){
      token 
      user{
        id
        username
      } 
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
