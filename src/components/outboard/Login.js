import React, { Component } from 'react';
import { Row, Form, Button, Card, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Action } from '../../redux/globalActionType';
class Login extends Component {

    constructor(props){
      super(props)
      this.state = {
        email: '',
        password: '',
        errors: {
          email: '',
          password: ''
        },
        isButtonDisabled: true
      }
    }

    formContent = [
        {
            label: "Email", 
            placeholder: "Enter Email",
            type: "text",
            controlId: "formEmail",
            name: "email"
        },
        {
            label: "Password", 
            placeholder: "Enter Password",
            type: "password",
            controlId: "formPassword",
            name: "password"
        },
    ]
    
    handleChange = (event) => {
      switch (event.target.name) {
        case 'email':
          const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          if(!event.target.value.match(emailRegex)){
            this.setFormValue(event, "email tidak valid")
            return
          }
          this.setFormValue(event, "")
          break;
        case 'password': 
          if(event.target.value.length < 6){
            this.setFormValue(event, "password tidak boleh kurang dari 6")
            return
          } 
          this.setFormValue(event, "")
          break;
        default:
          break;
      }
    }


    setFormValue = (event, error) => {
      this.setState({
        [event.target.name]: event.target.value,
        errors: {
          ...this.state.errors, 
          [event.target.name]: error,
        },
      }, () => {
       this.isButtonDisabled()
      })
    }

    handleSubmit = (event) => {
      event.preventDefault()
      if(this.state.email === "admin@example.com" && this.state.password === "12345678"){
        // this.props.setLoginState(true)
        this.props.handleLogin()
        return
      }
      alert("Incorrect login username or password")
    }

    isButtonDisabled = () => {
      let isButtonDisabled = false
        for(const form in this.state.errors){
          if(this.state.errors[form].length > 0 || this.state[form] === ''){
            isButtonDisabled = true
          }
        }
        this.setState({
          isButtonDisabled: isButtonDisabled
        })
    }

  render() {
    return (
        <Row className="d-flex align-items-center justify-content-start flex-grow-1" style={{ backgroundImage: "url('https://picsum.photos/536/354')", backgroundSize: "cover"}}>
            <Col className="flex-grow-1 w-100"></Col>
            <Col className="flex-grow-1 w-100" style={{textAlign: 'start'}}>
                <Card style={{width: "60%"}} >
                    <Card.Body>
                    <Card.Title>Login Page</Card.Title>
                    <Form onSubmit={this.handleSubmit}>
                        {
                            this.formContent.map((form)=> {
                                return (
                                    <Form.Group className="mb-3" controlId={form.controlId} key={form.controlId}>
                                        <Form.Label>{form.label}</Form.Label>
                                        <Form.Control type={form.type} name={form.name} placeholder={form.placeholder} onChange={this.handleChange}/>
                                        <Form.Text className="text-muted">{this.state.errors[form.name]}</Form.Text>
                                    </Form.Group>
                                )
                            })
                        }
                        <Button variant="primary" type="submit" disabled={this.state.isButtonDisabled}>
                            Submit
                        </Button>
                    </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogin: () => dispatch({type: Action.PAGE.LOGIN, payload: true}),
  }
}

const wrapper = connect(null, mapDispatchToProps)
export default wrapper(Login)
