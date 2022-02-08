import React, { Component } from 'react';
import { Form } from 'react-bootstrap'

export default class BaseSelect extends Component {
  render() {
    return (
        <Form.Group className="mb-3" controlId={this.props.name}>
            <Form.Label>{this.props.label}</Form.Label>
            <Form.Select onChange={this.props.handleChange} name={this.props.name}>
                {this.props.options.map((value, index)=> {
                    return (
                        <option key={index} value={value}>{value}</option>
                    )
                })}
            </Form.Select>
        </Form.Group>
    )
  }
}
