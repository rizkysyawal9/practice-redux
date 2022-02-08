import React, { Component } from 'react';
import { Container } from 'react-bootstrap'
import Login from '../components/outboard/Login';

export default class LoginScreen extends Component {

  render() {
    return (
        <Container style={{ height: '100vh' }} className="d-flex flex-column" fluid>
          <Login />
        </Container>
    );
  }
}
