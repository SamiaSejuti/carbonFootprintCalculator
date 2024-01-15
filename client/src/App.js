import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './containers/AuthContext.js';  
import Routes from './Routes';
import './App.css';

// import Navbar from './components/navbar';
// import DrawerAppBar from './layouts/DrawerAppBar';
import Layout from './layouts/Layout';

function App() {
  return (
    <Router>
      <AuthProvider>  
        <div>
          <Layout>
            <div className="app">
              <Routes />
            </div>
          </Layout>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
