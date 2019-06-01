import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-poke-search',
  templateUrl: './poke-search.component.html',
  styleUrls: ['./poke-search.component.css']
})
export class PokeSearchComponent implements OnInit {

  stats: any = null;
  POKEMON = 1;
  baseUrl: string = "https://pokeapi.co/api/v2/";
  type: string = "pokemon";
  name = null;
  catched = null;
  pokeCatched = [];
  error: string = null;

  findPokemons(id: any) {
    // this.stats = null;
    // this.catched = null;
    // let divRight = document.getElementById("right");
    // let divLeft = document.getElementById("left");
    if(id !== null && id !== ''){
      fetch(`${this.baseUrl}${this.type}/${id}`)
      .then(response => response.json())
      .then(responseJson => {
        // if(id >= 808) {
          this.stats = responseJson;
          this.pokeCatched.push(this.stats);
          this.name = '';
        // } else {
        //   this.error = 'No data';
        // }
          
        // divRight.classList.add('animated');
        // divRight.classList.add('fadeInRight');
        // divLeft.classList.add('animated');
        // divLeft.classList.add('fadeInLeft');
        // console.log(this.stats);
        
      })
    }
     
  }

  handleClickDeletePoke(list) {
    this.pokeCatched.splice(list, 1);
  }

  // resetPokemon() {
  //   this.stats = null;
  // }

  constructor() { 
    // this.catched = localStorage.getItem('catched-id');
  }

  ngOnInit() {
  }

}
