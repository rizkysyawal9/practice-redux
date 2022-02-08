import React, { Component } from 'react';
import welcome from '../../assets/welcome.svg'
import { Button } from 'react-bootstrap'

export default class EmptyList extends Component {
  render() {
    return (
      <div style={{textAlign: "center"}}>
        <div>
          <img src={this.props.image || welcome} alt="banner" style={{ marginTop: '16px' }} height="200px"/>
        </div>
        <p style={{marginTop: "28px"}}>Mohon maaf {this.props.name}<strong> kosong</strong>, silahkan tambah {this.props.name}</p>
        <Button onClick={() => {this.props.callback()}}>Tambah {this.props.name}</Button>
      </div>
      )
  }
}
