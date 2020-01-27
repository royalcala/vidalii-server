import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import Crud1 from './components/Crud1'

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://localhost:4000/graphql"
});

const client = new ApolloClient({
  cache,
  link,
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors::', graphQLErrors)
    console.log('networkError::', networkError)
  }
});
// const client = new ApolloClient({
//   uri: "http://localhost:3001/graphql",
//   onError: ({ networkError, graphQLErrors }) => {
//     console.log('graphQLErrors::', graphQLErrors)
//     console.log('networkError::', networkError)
//   }
// })

function App() {
  return (
    <ApolloProvider client={client}>
      <Crud1 />
    </ApolloProvider>
  )
}
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
