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
    currentMove: {}
  };
  attacks = [];
  accuracy = '';
  attackname = '';
  movesDetails = '';
  
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
    this.state.index = 0;
    let replacedURL = url.replace(/(.*?)pokemon\//, '' );
    let pokemonID = parseInt(replacedURL);
    // this.displayed_pokemonID = pokemonID;
    // this.scroll(target);
    fetch(`${this.baseUrl}/${pokemonID}`)
    .then(response => response.json())
    .then(details => {this.data = details;
    // console.log(this.data);
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
      // console.log(this.data);
    // Nazwa ataku potwora
    
    fetch(details.moves[this.state.index].move.url)
    .then(response => response.json())
    .then(this.attacks = details.moves)
    .then(moveAtk => {
      // this.type = moveAtk;
      this.state.currentMove = moveAtk;
      this.attacks[this.state.index];
      this.movesDetails = '';
      console.log(moveAtk);
      // console.log(this.state.currentMove);
      
      // console.log(this.attacks);
    })
    // Opis pokemona 
    fetch(`${details.species.url}`)
    .then(response => response.json())
    .then(species => {
      const entries = species.flavor_text_entries;
      // console.log(species);
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

  fetchAttackDetails(url){
    fetch(url)
      .then(response => response.json())
      .then(movesDetails => this.movesDetails = movesDetails
      )
      
  }

  nextMove() {

    if(this.state.index == this.attacks.length -1 ){
      
      this.state.index;
    }
    else{
      this.state.index += 1;
            if(this.state.index  <=  this.attacks.length - 1){
              this.state.currentMove = {};
        if(this.state.index >= 0){
          this.accuracy = this.attacks[this.state.index].move.url;
          this.attackname = this.attacks[this.state.index].move.name;
          this.fetchAttackDetails(this.attacks[this.state.index].move.url);
        }
      }
    }



    // console.log(this.state.index);
  }

  prevMove() {
    this.state.index -= 1;
    this.state.currentMove = {};
    if(this.state.index < 0){
      this.state.index = 0;
    }
    if(this.state.index >= 0){
      this.accuracy = this.attacks[this.state.index].move.url;
      this.attackname = this.attacks[this.state.index].move.name;
      this.fetchAttackDetails(this.attacks[this.state.index].move.url);
    }
   
  }

  changeLimits(limit: number, offset: number) {
    if(limit <= 1000 && limit > 0 && offset >= 0){
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
