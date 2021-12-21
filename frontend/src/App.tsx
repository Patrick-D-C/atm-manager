
import React from 'react';
import NotificationBar from './components/NotificationBar';
import { Component } from './components/Component';
import { AuthProvider } from './context/auth';

import Routes from './routes';
import "./styles/globals.scss";



function App() {
  return (
    <AuthProvider>
      <Component>
        <Routes />
        <NotificationBar />
      </Component>
    </AuthProvider>
  )
}

export default App;
