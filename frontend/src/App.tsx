
import React from 'react';
import NotificationBar from './components/NotificationBar';
import { Component } from './components/Component';
import { AuthProvider } from './context/auth';

import Routes from './routes';
import "./styles/globals.scss";
import { BrowserRouter } from 'react-router-dom';



function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Component>
          <Routes />
          <NotificationBar />
        </Component>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
