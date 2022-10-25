<<<<<<< HEAD
import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Profile from './pages/Profile'
// import FriendList from './pages/Friendlist'
// import Homepage from './pages/Homepage'
// import Login from './pages/Login'
// import SignUp from './pages/SignUp'
// import PartyInvites from './pages/PartyInvites'
// import Review from './pages/Review'
// import Wishlist from './pages/Wishlist'
import {
  ApolloClient,
  // ApolloProvider,
  InMemoryCache,
  createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
// import {BrowserRouter as Router, Routes} from 'react-router-dom';

const httpLink = createHttpLink({
  url: '/graphql',
})

// import Test from './pages/test'

const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem('id_token');
=======
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
>>>>>>> b3485497da90fc9be77d23a0808f9d417d14dfa4
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
});
<<<<<<< HEAD
// eslint-disable-next-line
=======

>>>>>>> b3485497da90fc9be77d23a0808f9d417d14dfa4
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
<<<<<<< HEAD

function App() {
  return (
    <>
    {/* ApolloProvider client={client}*/}
    <Navbar />
    <Profile />
    <Footer />
    {/* ApolloProvider */}
    </>
   
=======


function App() {
  return (
    // <ApolloProvider client={client}>
    <>
      <Test />
      <MovieData />
    </>
    //  </ApolloProvider>
>>>>>>> b3485497da90fc9be77d23a0808f9d417d14dfa4
  );
}

export default App;
