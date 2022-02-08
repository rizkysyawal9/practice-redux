import React, { Component } from 'react';
import {Table, Button} from 'react-bootstrap'
import BaseModal from '../BaseModal';
import BaseForm from '../BaseForm'
import BaseSelect from '../BaseSelect';
import { connect } from 'react-redux'
import { Action } from '../../redux/globalActionType'
import EmptyList from './EmptyList';
import tableImage from '../../assets/tables.svg'
class Tables extends Component {
    constructor(props){
        super(props)
        this.state = {
            form: {
                id: '',
                number: '',
                status: this.options[0]
            },
            isSubmitDisabled: true
        }
    }

    forms = [
        {
            name: 'id',
            label: 'ID',
            type: 'text',
            placeholder: 'Input ID'
        },
        {
            name: 'number',
            label: 'Number',
            type: 'text',
            placeholder: 'Input Number'
        },
        {
            name: 'status',
            label: 'Status',
            type: 'select',
            placeholder: 'Input Status'
        }
    ]

    options = [
        'Available', 
        'Unavailable'
    ]

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

    handleChangeSelect = (event) => {
        this.setState({
            form: {
                ...this.state.form, 
                status: event.target.value
            }
        })
    }

    handleSubmit = () => {
        const tableIdExist = this.findTableById(this.state.form.id)
        const errors = []
        if(tableIdExist.length > 0){
            errors.push("Table ID already Exist")
        }
        const tableNumberExist = this.findTableByNumber(this.state.form.number)
        if(tableNumberExist.length > 0){
            errors.push("Table Number already Exist")
        }
        if(errors.length > 0){
            alert(errors)
            return
        }
        this.props.addTable(this.state.form)
        this.handleClose()
    }

    handleClose = () => {
        this.setState({
            form: {
                id: '',
                number: '',
                status: this.options[0],
            },
            show: false,
            isSubmitDisabled: true,
        })
    }

    findTableById = (id) => {
        return this.props.tables.filter(table => table.id.toString() === id)
    }

    findTableByNumber = (number) => {
        return this.props.tables.filter(table => table.number.toString() === number)
    }

  render() {
    return (
        <div style={{textAlign: "start"}}>
            <Button style={{marginBottom: '16px'}} onClick={() => {this.showModal()}}>Tambah Tabel</Button>
            {
                this.props.tables.length > 0 ? (
                    <Table striped bordered hover >
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Number</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.tables.map((table)=> {
                                    return (
                                        <tr key={table.id} style={{textAlign: 'start'}}>
                                            <td>{table.id}</td>
                                            <td>{table.number}</td>
                                            <td style={{color: table.status === 'Available' ? 'blue' : 'orange'}}>{table.status}</td>
                                            <td><Button variant="danger" onClick={() => {this.props.deleteTable(table.id)}}>Delete</Button></td>
                                        </tr>
                                    )
                                })
                            }            
                        </tbody>
                    </Table>
                ) : <EmptyList name="table" callback={this.showModal} image={tableImage}/>
            }
          
            <BaseModal 
                title={"Tambah Table"}
                show={this.state.show} 
                handleClose={this.handleClose}
                handleSubmit={this.handleSubmit}
                isSubmitDisabled={this.state.isSubmitDisabled}
                >
                {
                    this.forms.map((form => {
                        return (
                            form.type === 'select' ? 
                            <BaseSelect
                                key={form.name} 
                                options={this.options} 
                                handleChange={this.handleChangeSelect}
                                label={form.label}    
                            />
                            : <BaseForm 
                                key={form.name}
                                name={form.name}
                                label={form.label}
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
      tables: state.tables
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        addTable: (newTable) => dispatch({type: Action.TABLE.ADD, payload: newTable}),
        deleteTable: (id) => dispatch({type: Action.TABLE.DELETE, payload: id}) 
    }
  }
  
const wrapper = connect(mapStateToProps, mapDispatchToProps)
export default wrapper(Tables)
