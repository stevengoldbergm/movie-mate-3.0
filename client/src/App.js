import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {BrowserRouter as Router, Routes} from 'react-router-dom';

const httpLink = createHttpLink({
  url: '/graphql',
})

// import Test from './pages/test'

const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem('id_token');
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
    <>
    {/* ApolloProvider client={client}*/}
    <Header />
    <Footer />
    {/* ApolloProvider */}
    </>
   
  );
}

export default App;
