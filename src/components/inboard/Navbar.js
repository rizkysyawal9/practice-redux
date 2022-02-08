import React, { Component } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import logo from '../../assets/logo.png'
import { Action } from '../../redux/globalActionType'

class NavbarApp extends Component {
  navItems=[
    {
        id: 1, 
        name: "Home",
        link: "home"
    },
    {
        id: 2, 
        name: "Menus",
        link: "menu"
    },
    {
        id: 3, 
        name: "Tables",
        link: "table"
    }, 
    {
        id: 4, 
        name: "Customer", 
        link: "customer"
    }
  ]

  render() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand>
                    <img src={logo} alt="logo" width="40px"/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  {
                    this.navItems.map((nav)=> 
                        <Nav.Link 
                            key={nav.id} 
                            href="#" 
                            onClick={() => {this.props.handlePageRender(nav.link)}} 
                            style={{fontWeight: this.props.currentPage === nav.link ? 'bold': ''}}>
                                {nav.name}
                        </Nav.Link>)
                  }
                </Nav>
                <Button variant="danger" onClick={() => {this.props.handleLogout()}}>
                    Logout
                </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
  }
}


const mapStateToProps = (state) => {
    return {
      currentPage: state.page.currentPage
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
      handleLogout: () => dispatch({type: Action.PAGE.LOGIN, payload: false}),
      handlePageRender: (currentPage) => dispatch({type: Action.PAGE.SET, payload: currentPage})
    }
  }
  
const wrapper = connect(mapStateToProps, mapDispatchToProps)
export default wrapper(NavbarApp)
  