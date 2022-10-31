// Import React
import React, { useState } from 'react';

// Import Components
// import Navbar from './components/Navbar';
import Navbar2 from './components/Navbar2/Navbar';
import Footer from './components/Footer';
import Footer2 from './components/Footer2/Footer2'
import Profile from './pages/Profile';
import SignUpForm from './pages/SignUp';
import LoginForm from './pages/LoginForm';
import Chat from './components/Chat'


// Import Pages
import Main from './pages/Main'; //needs mp4, and app.css data

import Reviews from './pages/Reviews';
// import Wishlist from './pages/Wishlist'
import MovieData from './pages/MovieData';
import MovieSearch from './pages/MovieSearch';


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
});


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
  const [loggedIn, setLoggedIn] = useState(false);
  // Make the navbar hold onto the state


  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar2 />
            <Routes>
              <Route 
                path='/' 
                element={<Main />}/
              >
              <Route 
                path='/movie-search/' 
                element={<MovieSearch />}
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
                path='/movie-details/:imdbId' 
                element={<MovieData />}
              />
              <Route
                path='/movie-data/:imdbId/reviews'
                element={<Reviews />}
              >
              </Route>
              <Route 
                path='/login' 
                element={<LoginForm />}
              />
              <Route 
                path='/movie-details/reviews/:imdbId' 
                element={<Reviews />}
              />
              <Route 
                path='*' 
                element={<Navigate to="/" />}
              />
            </Routes>
          <Chat />
          <Footer2 />
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
