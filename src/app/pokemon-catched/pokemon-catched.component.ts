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
  evoSprites = [];
  evoNames = [];
  evoses = [];
  evolves = [];

  // evolvesPokemon(id){
  //   this.evolve = null;
  //   this.name = null;
  //   this.evolve_to_third = null;
  //   this.evolve_to_second = null;
  //   if(id !== null && id !== ''){
  //     fetch(`${this.base}evolution-chain/${id}`)
  //     .then(response => response.json())
  //     .then(responseJson => {
  //     this.evolve = responseJson;
  //     console.log(this.evolve);
  //     if(this.evolve.chain.evolves_to.length  > 0 ){
  //       this.evolve_to_second = this.evolve.chain.evolves_to[0];

  //             // this.evolve_to_third = this.evolve_to_second.evolves_to[0];
  //           if(this.evolve_to_second.evolves_to.length > 0){
  //             this.evolve_to_third = this.evolve_to_second.evolves_to[0];
  //           }

  //     }
  //     // console.log(this.evolve_to_third.evolves_to != []);
  //     // console.log(this.evolve_to_third);

  //   console.log(this.evolve.chain.species.url);
  //   fetch(`${this.evolve.chain.species.url}`)
  //   .then(response => response.json())
  //   .then(evolve => console.log(evolve))
  //   })
  //   }
  // }

  changePokemon(id){
    this.name = null;
    if(id == 'string') { this.name = null;}
    if(id !== null && id !== '') {
      fetch(`${this.base}evolution-chain/${id}`)
      .then(response => response.json())
      .then(data => {
        const api = "https://pokeapi.co/api/v2/pokemon/";
        const first = data.chain;
        let second;
        let third;
        let evos = [];
        if(first) {
          const e1 = fetch(`${api}${first.species.name}/`);
          evos.push(e1);
          second = first.evolves_to[0];
        }
        if(second){
          const e2 = fetch(`${api}${second.species.name}/`);
          evos.push(e2);
          third = second.evolves_to[0];
        }
        if(third){
          const e3 = fetch(`${api}${third.species.name}/`);
          evos.push(e3);
        }
        Promise.all(evos)
          .then(responses => Promise.all(responses.map(value => value.json())))
          .then(dataList => {
            const sprites = dataList.map(v => v.sprites.front_default);
            const names = dataList.map(n => n.name);
            this.evoSprites = sprites;
            this.evoNames = names;
            // console.log(this.evoSprites);
            // console.log(this.evoNames);
          })
        // console.log(data);
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
