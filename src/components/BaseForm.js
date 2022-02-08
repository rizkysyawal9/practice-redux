import React, { Component } from 'react';
import { Form } from 'react-bootstrap'

export default class BaseForm extends Component {
  render() {
    return (
        <Form.Group className="mb-3" controlId={this.props.name}>
            <Form.Label>{this.props.label}</Form.Label>
            <Form.Control 
                type={this.props.type} 
                placeholder={this.props.placeholder} 
                name={this.props.name}
                onChange={this.props.handleChange}
            />
        </Form.Group>
    )
  }
}
