import { Component, OnInit } from '@angular/core';
import { PokemonDetails } from '../pokemon-details';

@Component({
  selector: 'app-all-pokemons',
  templateUrl: './all-pokemons.component.html',
  styleUrls: ['./all-pokemons.component.css']
})
export class AllPokemonsComponent implements OnInit {

  limit: number = 10;
  baseUrl: string = "https://pokeapi.co/api/v2/"
  namesPokemons: string = null;
  data: PokemonDetails = null;
  text: string = null;
  currentPage: number = 1;
  nextPage: string = null;
  count: number = null;
  offset: number = 0;
  catchStatus = null;
  change: boolean = false;
  pokeCatched = [];


  changePage($event){
    this.offset = 10 * $event.pageIndex; 
    this.fetchPokemon(this.limit, this.offset);
  }

  fetchPokemon(limit: number, offset: number, category = 'pokemon'){

    
    fetch(`${this.baseUrl}${category}?offset=${offset}&limit=${limit}`)
    .then(response => response.json())
    .then(responseJson => {
      this.text = responseJson.results;
      this.nextPage = responseJson.next;
      this.count = responseJson.count;
    })
  }
  constructor() { 
    this.catchStatus = localStorage.getItem(`saved-pokemon-id`);
  }

  ngOnInit() {
    this.fetchPokemon(this.limit, this.offset);
  }

  // changeCatch($event, name){
  //   if($event.target.innerHTML == this.catch) {
  //     this.catch = 'Caught';
  //   } else {
  //     this.catch = 'Catch';
  //   }
  //   console.log($event.target.innerHTML);
  //   console.log(name);
  // }

  // changeCatch(el: string){
  //   let divToChange = document.getElementById(el); 
    
  //   this.catchStatus = divToChange;
  //   if(divToChange.innerText == 'Catch') {
  //     this.catchStatus.innerText = 'Caught';
  //   } else {
  //     this.catchStatus.innerText = 'Catch';
  //   }
  //   console.log(divToChange);
  // }
  save(url, event){
    // let storage = this.pokeCatched.push(url);
    // for(let i=0; i<this.pokeCatched.length; i++){
      // this.catchStatus = localStorage.setItem(`saved-pokemon-id`, this.pokeCatched[i]);
      // console.log(this.pokeCatched.indexOf(this.catchStatus));
      localStorage.setItem('saved-pokemon-id', url);
      this.catchStatus = url;
    // }
    // this.catchStatus = storage;
    // storage = this.catchStatus;
    // console.log(storage);
    // console.log(this.catchStatus);
    
  }
}
