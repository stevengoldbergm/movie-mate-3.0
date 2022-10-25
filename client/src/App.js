import React from 'react';
import { 
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Test from './pages/test'
import MovieData from './pages/MovieData';

// Set up HTTP for GQL to attach to Apollo
const httpLink = createHttpLink({
  uri: '/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItme('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})


function App() {
  return (
    // <ApolloProvider client={client}>
    <>
      <Test />
      <MovieData />
    </>
    //  </ApolloProvider>
  );
}

export default App;
