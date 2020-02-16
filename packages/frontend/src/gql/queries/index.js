import gql from 'graphql-tag';

export const GET_CART_ITEMS = gql`
query GetCartItems {
  cartItems @client
}
`;

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
    hola @client
  }
`;