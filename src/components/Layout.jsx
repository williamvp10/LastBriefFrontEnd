import '../styles/components/Layout.css';

import { Container } from "react-bootstrap";
//import Footer from "./Footer";
import { Header } from './Header';
import React from "react";

const Layout = ({ children }) => {
    return (
        <div className='container-fluid mx-0 px-0 vh-100'>
            
                <div className='col-12 px-0 header'><Header /></div>
                <div className='col-12 py-0 mx-0 px-0 content-app'>{children}</div>
                {//--<div className='vh-auto col-12 pt-5 mt-5 '><Footer /></div>
                }
        </div>
    )
}

export default Layout;
