import './App.css';
import Inboard from './pages/Inboard'
import Outboard from './pages/Outboard'
import { Component } from 'react';
import { connect } from 'react-redux'
class App extends Component {

  render(){
    return (
      <div className="App">
        {
          this.props.loggedIn ? 
          // Component for logged in user
            <Inboard /> : 
          // Component for not logged in user
            <Outboard />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.page.loggedIn
  }
}

const wrapper = connect(mapStateToProps)
export default wrapper(App)
