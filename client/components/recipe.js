import React, { Component } from 'react';
import axios from 'axios';


class Recipe extends Component {

  render() {
    

    return (
      <div>
        <img src={this.props.recipedata.recipe.image}/>
        <p>{this.props.recipedata.recipe.label}</p>
        <p>{this.props.recipedata.recipe.url}</p>
        <p>{this.props.recipedata.recipe.ingredientLines}</p>
        <p>{this.props.recipedata.recipe.yield}</p>
        <p>{this.props.recipedata.recipe.calories}</p>
      </div>
    )
  }
}

module.exports = Recipe;