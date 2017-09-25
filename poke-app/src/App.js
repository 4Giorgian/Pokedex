import React, { PureComponent } from 'react';
import axios from 'axios';
import './App.css';

class Pokeapp extends PureComponent {

  state= {
    value: '',
    pokemon: '',
  };

  handleChange= (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit= (event) => {
    event.preventDefault();
    const promise = axios.get(`https://pokeapi.co/api/v2/pokemon/${this.state.value}/`);
    promise.then((response) => {
      console.log(response);
      const {
        base_experience:power,
        name,
        sprites:{
          front_default:avatar,
        },
        abilities,
        types,
      }= response.data

      const pokemon = {
        power,
        name,
        avatar,
        abilities,
        types,
      };

      this.setState({
        pokemon,
      });

    });
  }

  render() {
    const{
      value,
      pokemon,
    }= this.state;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {pokemon && (
          <div>
            <ul>{pokemon.abilities.map(obj =>
                  {
                    return (
                      <li key={obj.ability.name} >{obj.ability.name}</li>
                    )
                  })
                 }
            </ul>
            <ul>{pokemon.types.map(obj => {
              return (
                <li key={obj.type.name}>{obj.type.name}</li>
              )
            })}</ul>
            <div>{pokemon.power}</div>

          <div className="card">
            <div className="powerWrapper">
              <div className="power">PL {pokemon.power}</div>
            </div>
            <div className="avatarWrapper">
              <img className="avatar" src={pokemon.avatar} alt='pokemon' />
            </div>
            <div className="summary">
              <div className="name">{pokemon.name}</div>
            </div>
          </div>

          </div>
        )}

      </div>
    );
  }
}

export default Pokeapp;
