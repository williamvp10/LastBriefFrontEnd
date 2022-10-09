import React, { useEffect, useState }  from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import logo from './logo.svg';
import '../styles/App.css';
import { Header } from '../components/Header';
import Layout from '../components/Layout';
import Home from './Home';
import RegisterLetter from './RegisterLetter';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
      <Layout>
              <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/Register_letter" element={<RegisterLetter/>}/>
                  {/*<Route path="/Migration_info" element={<Migration_info/>}/>
  <Route path="/Migration/:type" element={<Migration/>}/>*/}
              </Routes>
      </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
