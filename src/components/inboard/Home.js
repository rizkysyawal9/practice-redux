import React, { Component } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import customers from '../../assets/customers.svg'
import menus from '../../assets/menus.svg'
import tables from '../../assets/tables.svg'
import { Action } from '../../redux/globalActionType'
class Home extends Component {
  components = [
    {
      name: "Menu",
      type: "menus",
      link: "menu",
      image: menus
    },
    {
      name: "Table",
      type: "tables",
      link: "table",
      image: tables
    },
    {
      name: "Customer",
      type: "customers",
      link: "customer",
      image: customers
    }
  ]
  render() {
    return (
        <div style={{textAlign: "start"}}>
            {/* <img src={welcome} alt="banner" style={{ maxWidth: '30%', marginTop: '16px' }}/> */}
            <p style={{fontSize: "1.25em", fontWeight: 'bold'}}>Selamat datang di dashboard WM Bakari</p>
            <Row>
              {
                this.components.map((component, index)=> {
                  return (
                    <Col key={index}>
                      <Card>
                        <Card.Body>
                          <Card.Title>
                          {component.name}
                          </Card.Title>
                          <Card.Text>
                            {this.props.items[component.type].length} items
                          </Card.Text>
                          <div style={{textAlign: "center", padding: "20px 0"}}>
                            <img src={component.image} alt={`${component.name}-img`} height="100px"/>
                          </div>
                          <Button variant="success" onClick={() => {this.props.handlePageRender(component.link)}}>Details</Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  )
                })
              }
            </Row>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    items: {
      menus: state.menus || [], 
      tables: state.tables || [], 
      customers: state.customers || [],
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handlePageRender: (currentPage) => dispatch({type: Action.PAGE.SET, payload: currentPage})
  }
}

const wrapper = connect(mapStateToProps, mapDispatchToProps)
export default wrapper(Home)
