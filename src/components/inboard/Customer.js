import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Action } from '../../redux/globalActionType'
import {Table, Button} from 'react-bootstrap'
import BaseModal from '../BaseModal';
import BaseForm from '../BaseForm'
import customerImage from '../../assets/customers.svg'
class Customer extends Component {
    constructor(props){
        super(props)
        this.state = {
            form: {
                id: '',
                name: '',
                email: '',
                address: '',
            },
            isSubmitDisabled: true,
        }
    }

    isSubmitDisabled = () => {
        let isDisabled = false;
        for(const form in this.state.form){
            if(this.state.form[form] === ''){
                isDisabled = true
            }
        }
        this.setState({
            isSubmitDisabled: isDisabled
        })
    }

    forms = [
        {
            name: 'id',
            label: 'ID',
            type: 'text',
            placeholder: 'Input ID'
        },
        {
            name: 'name',
            label: 'Name',
            type: 'text',
            placeholder: 'Input Name'
        },
        {
            name: 'email',
            label: 'Email',
            type: 'text',
            placeholder: 'Input Email'
        },
        {
            name: 'address',
            label: 'Address',
            type: 'text',
            placeholder: 'Input Address'
        }
    ]


    handleChange = (event) => {
        this.setState({
            form: {
                ...this.state.form,
                [event.target.name]: event.target.value
            }
        }, () => {
            this.isSubmitDisabled()
        })
    }

    findCustomerById = (id) => {
        return this.props.customers.filter((customer) => customer.id.toString() === id)
    }

    handleSubmit = () => {
        const isMenuExist = this.findCustomerById(this.state.form.id)
        if(isMenuExist.length > 0){
            alert("Id already Exist")
            return
        }
        this.props.addCustomer(this.state.form)
        this.handleClose()
    }

    handleClose = () => {
        this.props.handleShowModal(false)
        this.setState({
            form: {
                id: '',
                name: '',
                email: '',
                address: ''
            },
            isSubmitDisabled: true,
        })
    }

    render() {
        return (
            <div style={{textAlign: "start"}}>
            <Button style={{marginBottom: '16px'}} onClick={() => {this.props.handleShowModal(true)}}>Tambah Customer</Button>
            {
                this.props.customers.length > 0 ? (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.customers.map((customer)=> {
                                    return (
                                        <tr key={customer.id} style={{textAlign: 'start'}}>
                                            <td>{customer.id}</td>
                                            <td>{customer.name}</td>
                                            <td>{customer.email}</td>
                                            <td>{customer.address}</td>
                                            <td><Button variant="danger" onClick={() => {this.props.deleteCustomer(customer.id)}}>Delete</Button></td>
                                        </tr>
                                    )
                                })
                            }            
                        </tbody>
                    </Table>
                ) : (
                    <div style={{textAlign: "center"}}>
                        <div>
                        <img src={customerImage} alt="banner" style={{ marginTop: '16px' }} height="200px"/>
                        </div>
                        <p style={{marginTop: "28px"}}>Mohon maaf customer<strong> kosong</strong>, silahkan tambah customer</p>
                        <Button onClick={() => {this.props.handleShowModal(true)}}>Tambah customer</Button>
                    </div>
                )
            }
           
            <BaseModal 
                title={"Tambah Menu"}
                show={this.props.showModal} 
                handleClose={this.handleClose}
                handleSubmit={this.handleSubmit}
                isSubmitDisabled={this.state.isSubmitDisabled}
                >
                {
                    this.forms.map((form => {
                        return (
                            <BaseForm 
                                key={form.name}
                                label={form.label}
                                name={form.name}
                                placeholder={form.placeholder}
                                handleChange={this.handleChange}
                            />
                        )
                    }))
                }
            </BaseModal>
            </div>
            )
    }
}

const mapStateToProps = (state) => {
    return {
      customers: state.customers,
      showModal: state.page.showModal
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        addCustomer: (newCustomer) => dispatch({type: Action.CUSTOMER.ADD, payload: newCustomer}),
        deleteCustomer: (id) => dispatch({type: Action.CUSTOMER.DELETE, payload: id}),
        handleShowModal: (bool) => dispatch({type: Action.PAGE.SHOWMODAL, payload: bool})
    }
  }
  
const wrapper = connect(mapStateToProps, mapDispatchToProps)
export default wrapper(Customer)
