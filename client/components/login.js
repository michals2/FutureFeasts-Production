import React, { Component } from 'react';
import axios from 'axios';


class Login extends Component {

  render() {
    return (
    <div>
      <form onSubmit={this.props.handleLoginSubmit}>
        <input type="text" name="username" value={this.props.username} onChange={this.props.handleChange} />
        <input type="password" name="password" value={this.props.password} onChange={this.props.handleChange} />
        <input type="submit" value="login"/>
      </form>
      <p>Don't have an account?</p> 
      <button value="signup" onClick={this.props.handleSignUp}>fjdlasjfhlas</button>
    </div>
    )
  }
}

module.exports = Login;