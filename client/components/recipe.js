import React, { Component } from 'react';
import axios from 'axios';


class Recipe extends Component {
  constructor(props) {
    super(props)
    this.saveToDay = this.saveToDay.bind(this);
    this.handleDropDownChange = this.handleDropDownChange.bind(this);
    this.state = {
      day: "",
    }
  }

  handleDropDownChange(e) {
    this.setState({day: e.target.value})
  }


  saveToDay(e) {
    e.preventDefault();
    axios.post('/recipeDisplay', { day: this.state.day, //TEST THIS!!!
                                   username: this.props.username, //USERNAME MUST BE PASSED DOWN FROM PARENT
                                   recipe: this.props.recipedata
                                  })
      .then(response => {
        console.log(response.data);
      });

  }

  render() {
    console.log(this.state)
    //ingredientLines is an array so wont display properly
    return (
      <div>

        <form onSubmit={this.saveToDay}>
          <select name="days" onChange={this.handleDropDownChange}>
            <option value="Select Day">Select Day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
          <input type="submit" value="Save" />
        </form>
        <a href={this.props.recipedata.recipe.url}><img src={this.props.recipedata.recipe.image}/></a>
        <h3>{this.props.recipedata.recipe.label}</h3>
        <p>{this.props.recipedata.recipe.ingredientLines}</p>
        <span>{this.props.recipedata.recipe.yield}</span>
        <span>{this.props.recipedata.recipe.calories}</span>
      </div>
    )
  }
}

module.exports = Recipe;