import React, { Component } from 'react';
import { Button, Modal} from 'react-bootstrap'

export default class BaseModal extends Component {
  render() {
    return (
        <Modal show={this.props.show} onHide={this.props.handleClose} backdrop="static">
                <Modal.Header closeButton >
                <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   {this.props.children}
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={this.props.handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={this.props.handleSubmit} disabled={this.props.isSubmitDisabled}>
                    Submit
                </Button>
                </Modal.Footer>
            </Modal>
    )
  }
}
