// Import React
import React from 'react'

// Import Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Profile from './pages/Profile'
import SignUpForm from './pages/SignUp'
import LoginForm from './pages/Login'


// Import Pages

// import FriendList from './pages/Friendlist'
import Homepage from './pages/Homepage'
// import PartyInvites from './pages/PartyInvites'
import Review from './pages/Review'
// import Wishlist from './pages/Wishlist'
import MovieData from './pages/MovieData'

// import Test from './pages/test'

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

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
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route 
              path='/' 
              element={<Homepage />}
            />
            <Route 
              path='/sign-up' 
              element={<SignUpForm />}
            />
            <Route 
              path='/profile' 
              element={<Profile />}
            />
            <Route 
              path='/movie-data/:imdbId' 
              element={<MovieData />}
            />
            <Route 
              path='/login' 
              element={<LoginForm />}
            />
            <Route 
              path='/movie-data/reviews/:imdbId' 
              element={<Review />}
            />
            <Route 
              path='*' 
              element={<Navigate to="/" />}
            />
          </Routes>
          <Footer />
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
