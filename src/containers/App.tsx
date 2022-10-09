import React, { useEffect, useState }  from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import logo from './logo.svg';
import '../styles/App.css';
import { Header } from '../components/Header';
import Layout from '../components/Layout';
import Home from './Home';
import RegisterLetter from './RegisterLetter';
import SucessTransaction from './SucessTransaction';
import Briefs from './Briefs';
function App() {

  return (
    <BrowserRouter>
      <div className="App">
      <Layout>
              <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/Register_letter" element={<RegisterLetter/>}/>
                  <Route path="/Sucess_transaction" element={<SucessTransaction/>}/>
                  <Route path="/Briefs" element={<Briefs/>}/>
              </Routes>
      </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
