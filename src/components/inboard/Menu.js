import React, { Component } from 'react';
import {Table, Button} from 'react-bootstrap'
import BaseModal from '../BaseModal';
import BaseForm from '../BaseForm'
import { connect } from 'react-redux'
import { Action } from '../../redux/globalActionType'
import EmptyList from './EmptyList';
import menuImage from '../../assets/menus.svg'

class Menu extends Component {
    constructor(props){
        super(props)
        this.state = {
            form: {
                id: '',
                name: '',
                price: '',
            },
            show: false,
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
            name: 'price',
            label: 'Price',
            type: 'text',
            placeholder: 'Input Price'
        }
    ]

   showModal = () => {
        this.setState({
            show: true
        })
    }

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

    findMenuById = (id) => {
        return this.props.menus.filter((menu) => menu.id.toString() === id)
    }

    handleSubmit = () => {
        const isMenuExist = this.findMenuById(this.state.form.id)
        if(isMenuExist.length > 0){
            alert("Id already Exist")
            return
        }
        this.props.addMenu(this.state.form)
        this.handleClose()
    }

    handleClose = () => {
        this.setState({
            form: {
                id: '',
                name: '',
                price: '',
            },
            show: false,
            isSubmitDisabled: true,
        })
    }

    convertToRupiah = (number) => {
        const format = number.toString().split('').reverse().join('');
        const convert = format.match(/\d{1,3}/g);
        const rupiah = 'Rp ' + convert.join('.').split('').reverse().join('')
        return rupiah
    }

  render() {
    return (
        <div style={{textAlign: "start"}}>
            <Button style={{marginBottom: '16px'}} onClick={() => {this.showModal()}}>Tambah Menu</Button>
            {
                this.props.menus.length > 0 ? 
                (<Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.menus.map((food)=> {
                                return (
                                    <tr key={food.id} style={{textAlign: 'start'}}>
                                        <td>{food.id}</td>
                                        <td>{food.name}</td>
                                        <td>{this.convertToRupiah(food.price)}</td>
                                        <td><Button variant="danger" onClick={() => {this.props.deleteMenu(food.id)}}>Delete</Button></td>
                                    </tr>
                                )
                            })
                        }            
                    </tbody>
                </Table>) : <EmptyList name="menu" callback={this.showModal} image={menuImage}/>
            }
            
            <BaseModal 
                title={"Tambah Menu"}
                show={this.state.show} 
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
      menus: state.menus
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        addMenu: (newMenu) => dispatch({type: Action.MENU.ADD, payload: newMenu}),
        deleteMenu: (id) => dispatch({type: Action.MENU.DELETE, payload: id}) 
   
    }
  }
  
const wrapper = connect(mapStateToProps, mapDispatchToProps)
export default wrapper(Menu)
