import React, { Component } from 'react';
import Home from '../components/inboard/Home';
import Menu from '../components/inboard/Menu';
import Tables from '../components/inboard/Table';
import Navbar from '../components/inboard/Navbar';
import { Container } from 'react-bootstrap'
import { connect } from 'react-redux'
import Customer from '../components/inboard/Customer';
class Inboard extends Component {

    constructor(props){
        super(props)
        this.state = {
            currentPage: 'home',
        }
    }

    
    render() {
      const renderComponent = () => {
          switch (this.props.currentPage) {
                case "home":
                    return <Home />
                case "menu":
                    return <Menu />
                case "table":
                    return <Tables />
                case "customer": 
                    return <Customer />
              default:
                  return <Home />
          }
      }
    return (
        <>
            <Navbar />
            <Container style={{padding: '30px 0'}}>
                {renderComponent()}
            </Container>
        </>
    )
  }
}

const mapStateToProps = (state) => {
    return {
      currentPage: state.page.currentPage
    }
  }
  
const wrapper = connect(mapStateToProps)
export default wrapper(Inboard)
  