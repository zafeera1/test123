import React from 'react';
import { Outlet } from 'react-router-dom';
import './index.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  console.log("Token retrieved from localStorage:", token);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <header className="header">
        <Header />
        <Nav />
      </header>
      <div id="content">
        <Outlet />
      </div>
      <Footer />
    </ApolloProvider>
  );
};

export default App;
