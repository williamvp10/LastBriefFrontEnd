
import React, { Component } from 'react';
//import '../styles/components/Header.css';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Col from 'react-bootstrap/Col';
import WalletButton from '../hooks/WalletButton';

export class Header extends Component {
  render() {
    return  <>
    <Navbar bg="dark" variant="dark">
      <Container>
        <Col md={4} >
            <Navbar.Brand href="#home">
                <img
                    alt=""
                    src={process.env.PUBLIC_URL + '/logo.svg'}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                React Bootstrap
            </Navbar.Brand>
        </Col>
        <Col md={{ span: 4, offset: 4 }} > 
            <WalletButton></WalletButton>
        </Col>
      </Container>
    </Navbar>
  </>
  }
}