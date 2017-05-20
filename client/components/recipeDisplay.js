import React, { Component } from 'react';
import axios from 'axios';
import Recipe from './recipe.js';


class RecipeDisplay extends Component {
   constructor(props) {
    super(props)
      this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
      this.handleRecipeChange = this.handleRecipeChange.bind(this);
      this.state = {
      q: "",
      healthlabel: "",
      recipes: [],
    }
   }


handleRecipeChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

handleSearchSubmit() {
    let base = 'https://api.edamam.com/search?';
    let q = `q=${this.state.q}`;
    let idAndKey = `&app_id=9c91d5f4&app_key=6f47ee6858565edebe96788f8743461a`;
    let range = `&from=0&to=5`;
    //let health = `&health=`;
    let url = base+q+idAndKey+range;
    axios.get(url)
    .then( (response) => {
        console.log(response);
        //response.hits is an array of 5 recipe objects... or at least should be.. test?
        this.setState({recipes: response.hits});
    })
}

  render() {

    let recipes = this.state.recipes.map(curr => {
        <Recipe recipedata={curr} username={this.props.username}/>
    })

    console.log(this.state.recipes)

    return (
      <div>
        <form onSubmit = {this.handleSearchSubmit}>
          <input placeholder="Search" type="text" name="q" value={this.state.q} onChange={this.handleRecipeChange} />
          <input type="submit" value="submit" />
          <button>Profile</button>
          {recipes}
        </form>
      </div>
    )
  }
}

module.exports = RecipeDisplay;