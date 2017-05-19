import React, { Component } from 'react';
import axios from 'axios';
import Login from './login.js';

class App extends Component {
  constructor(props) {
    super(props)
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {
      0: true,
      1: false,
      2: false,
      3: false,
      username:'',
      password:'',
    }
  }
  handleSignUp() {
    this.setState({0: false, 1: true, 2: false, 3: false})
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleLoginSubmit() {
    axios.post('/login', { username: this.state.username, password: this.state.password })
      .then(response => {
        console.log(response.data);
      });
  }
  
  // componentDidMount() {
  //   axios.post()
  // }

  render() {
  
    if (this.state[0] === true) {
      return(
        <div>
        <h1>This is working!!!</h1>
          <Login handleSignUp={this.handleSignUp} handleChange={this.handleChange} handleLoginSubmit={this.handleLoginSubmit} />
        </div>
      )
    } else if (this.state[1] === true) {
      return(signup.page)
    } 
  }

}


module.exports = App;