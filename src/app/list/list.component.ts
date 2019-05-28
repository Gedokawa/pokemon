import { Component, OnInit } from '@angular/core';
import { PokemonDetails } from '../pokemon-details';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  data: PokemonDetails = null;
  pokemons = null;
  baseUrl: string = "https://pokeapi.co/api/v2/pokemon"
  text: string;
  limit: number = null;
  namesPokemons: string = null;
  displayed_pokemonID: number = null;
  state = {
    index: 0,
    currentMove: {},
    loading: false
  };
  
  showPoke(limit: number, offset:number){
    fetch(`${this.baseUrl}?offset=${offset}&limit=${limit}`)
    .then(response => response.json())
    .then(responseJson => {
       for(let i=0; i<responseJson.results.length; i++){
        this.pokemons = responseJson;
       }
       this.pokemons = responseJson;
      //  this.pokemonsURLs = responseJson.results[0].url;
      //  console.log(this.pokemons);
      });
  }

  
  showName(url: string) {
    
    let replacedURL = url.replace(/(.*?)pokemon\//, '' );
    let pokemonID = parseInt(replacedURL);
    // this.displayed_pokemonID = pokemonID;
    // this.scroll(target);
    fetch(`${this.baseUrl}/${pokemonID}`)
    .then(response => response.json())
    .then(details => {this.data = details;
    console.log(this.data);
    // for(let i=0; i<details.moves.length; i++){
    //   console.log(details.moves[i].move.url);
    // }
    // for(let moves of details.moves) {
    //   fetch(moves.move.url).then(response => response.json())
    //   .then(moveAtk => {
    //     this.state.currentMove = moveAtk;
    //     console.log(this.state.currentMove);
    //   });
    // }
    fetch(details.moves[this.state.index].move.url)
    .then(response => response.json())
    .then(moveAtk => {
      this.state.currentMove = moveAtk;
      console.log(this.state.currentMove);
    })
    fetch(`${details.species.url}`)
    .then(response => response.json())
    .then(species => {
      const entries = species.flavor_text_entries;

      for(let i=0; i<entries.length; i++){
        const entry = entries[i];

        if(entry.language.name === "en") {
          this.data.description = entry.flavor_text;
          break;
        }
      }
    })

    // console.log(this.data.stats);
    
  }  
  )}

  nextMove() {
    this.state.index += 1
    console.log(this.state.index);
  }

  prevMove() {
    this.state.index -= 1;
    console.log(this.state.index);
  }

  changeLimits(limit: number, offset: number) {
    if(limit <= 500 && limit > 0 && offset >= 0){
      this.showPoke(limit, offset);
      this.data = null;
    } else {
      this.pokemons = null;
    }
    
  }
  
  constructor() { 
 
  }

  ngOnInit() {
    
  }


  

}
