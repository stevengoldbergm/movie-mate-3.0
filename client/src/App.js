import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Profile from './pages/Profile'
import SignUpForm from './pages/SignUp'

// import FriendList from './pages/Friendlist'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
// import PartyInvites from './pages/PartyInvites'
import Review from './pages/Review'
// import Wishlist from './pages/Wishlist'
import Test from './pages/test'
import MovieData from './pages/MovieData'

import {
  ApolloClient,
  ApolloProvider,
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
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
});
// eslint-disable-next-line
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})


function App() {
  return (
    <ApolloProvider client={client}>
    <>
      <Navbar />
      <SignUpForm />
      <Footer />
    </>
    </ApolloProvider>
  );
}

export default App;
