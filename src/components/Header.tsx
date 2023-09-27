
import React, { Component } from 'react';
//import '../styles/components/Header.css';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Col from 'react-bootstrap/Col';
import WalletButton from '../hooks/WalletButton';
import { Link } from 'react-router-dom';
import logo2 from '../styles/images/Logo2.png';

export class Header extends Component {
  render() {
    return  <>
    <Navbar bg="ligth" variant="ligth">
      <Container>
        <Col md={4} >
        <Link to={"/"}>
            <Navbar.Brand href="#home" className="navbar-title">
                <img
                    alt=""
                    src={logo2}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />
                <a>Last Brief</a>
            </Navbar.Brand>
        </Link>
        </Col>
        <Col md={{ span: 4, offset: 4 }} > 
            <WalletButton></WalletButton>
        </Col>
      </Container>
    </Navbar>
  </>
  }
}