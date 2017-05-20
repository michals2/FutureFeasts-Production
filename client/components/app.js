import React, { Component } from 'react';
import axios from 'axios';
import Login from './login.js';
import Signup from './signup.js';
import RecipeDisplay from './recipeDisplay.js';

class App extends Component {
  constructor(props) {
    super(props)
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUpClick = this.handleSignUpClick.bind(this);
    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
    this.handleRecipeRender = this.handleRecipeRender.bind(this);
    this.state = {
      0: true,
      1: false,
      2: false,
      3: false,
      username: '',
      password: '',
    }
  }

  handleSignUpClick() {
    this.setState({ 0: false, 1: true, 2: false, 3: false })
  }


  handleRecipeRender() {
    this.setState({ 0: false, 1: false, 2: true, 3: false})
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSignUpSubmit(e) {
    axios.post('/signup', { username: this.state.username, password: this.state.password })
      .then(response => {
        console.log('response', response)
        //response.data
      })
  }

  handleLoginSubmit(e) {
    e.preventDefault();
    axios.post('/login', { username: this.state.username, password: this.state.password })
      .then(response => {
        this.setState({ 0: false, 1: false, 2: true, 3: false})
        // this.handleRecipeRender();
      })
      .catch(err => {
        console.log(err)
      });
  }

  render() {
    if (this.state[0] === true) {
      return (
        <div>
          <Login handleSignUpClick={this.handleSignUpClick} handleChange={this.handleChange} handleLoginSubmit={this.handleLoginSubmit} />
        </div>
      )
    } else if (this.state[1] === true) {
      return (
        <div>
          <Signup handleChange={this.handleChange} handleSignUpSubmit={this.handleSignUpSubmit} />
        </div>
      )
    } else if (this.state[2] === true) {
      return (
        <div>
          <RecipeDisplay username={this.state.username} />
        </div>
      )
    }
  }
}


module.exports = App;