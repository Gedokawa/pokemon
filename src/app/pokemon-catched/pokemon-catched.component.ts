import { Component, OnInit } from '@angular/core';
import { MockDirectiveResolver } from '@angular/compiler/testing';

@Component({
  selector: 'app-pokemon-catched',
  templateUrl: './pokemon-catched.component.html',
  styleUrls: ['./pokemon-catched.component.css']
})
export class PokemonCatchedComponent implements OnInit {

  evolve = null;
  species = null;
  base = 'https://pokeapi.co/api/v2/';
  name = null;
  evolve_to_second = null;
  evolve_to_third = null;

  evolvesPokemon(id){
    this.evolve = null;
    this.name = null;
    if(id !== null && id !== ''){
      fetch(`${this.base}evolution-chain/${id}`)
      .then(response => response.json())
      .then(responseJson => {
      this.evolve = responseJson;
      console.log(responseJson)
      this.evolve_to_second = this.evolve.chain.evolves_to[0];
      // this.evolve_to_third = this.evolve_to_second.evolves_to[0];
      if(this.evolve_to_second.evolves_to[0] !== 0){
        this.evolve_to_third = this.evolve_to_second.evolves_to[0];
      }
      console.log(this.evolve_to_third.evolves_to != []);
      console.log(this.evolve_to_third);
    })
    }
    
  }

  constructor() {
    // fetch(`${this.base}`)
    // .then(response => response.json())
    // .then(responseJson => {
    //   this.evolve = responseJson;
    //   console.log(responseJson)
    //   fetch(this.evolve.chain.species.url)
    //   .then(response => response.json())
    //   .then(species => {
    //     console.log(species);
    //   })
    // })
   }

  ngOnInit() {
    
  }

}
