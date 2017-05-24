import React, { Component } from 'react';
import axios from 'axios';


class Signup extends Component {

  render() {
    return (
      <div>
        <h1>Signup Page</h1>
        <form onSubmit={this.props.handleSignUpSubmit}>
          <input placeholder="Create firstName" type="text" name="first_name" value={this.props.first_name} onChange={this.props.handleChange} />
          <input placeholder="Create lastName" type="text" name="last_name" value={this.props.last_name} onChange={this.props.handleChange} />
          <input placeholder="Create Username" type="text" name="username" value={this.props.username} onChange={this.props.handleChange} />
          <input placeholder="Create Password" type="password" name="password" value={this.props.password} onChange={this.props.handleChange} />
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    )
  }
}

module.exports = Signup;