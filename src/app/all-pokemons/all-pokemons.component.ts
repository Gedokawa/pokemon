import { Component, OnInit } from '@angular/core';
import { PokemonDetails } from '../pokemon-details';

@Component({
  selector: 'app-all-pokemons',
  templateUrl: './all-pokemons.component.html',
  styleUrls: ['./all-pokemons.component.css']
})
export class AllPokemonsComponent implements OnInit {
  limit: number = 10;
  baseUrl: string = 'https://pokeapi.co/api/v2/';
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

  public caughtPokemons: Array<string> = [];

  constructor() {
    this.caughtPokemons =
      JSON.parse(localStorage.getItem(`caught-pokemons`)) || [];
  }

  ngOnInit() {
    this.fetchPokemon(this.limit, this.offset);
  }

  changePage($event): void {
    this.offset = 10 * $event.pageIndex;
    this.fetchPokemon(this.limit, this.offset);
  }

  fetchPokemon(limit: number, offset: number, category = 'pokemon'): void {
    fetch(`${this.baseUrl}${category}?offset=${offset}&limit=${limit}`)
      .then(response => response.json())
      .then(responseJson => {
        this.text = responseJson.results;
        this.nextPage = responseJson.next;
        this.count = responseJson.count;
      });
  }

  public isCaught(url: string): boolean {
    return this.caughtPokemons.includes(url);
  }

  public preserveData(): void {
    localStorage.setItem(
      `caught-pokemons`,
      JSON.stringify(this.caughtPokemons)
    );
  }

  public toggleStatus(url: string): void {
    if (this.isCaught(url)) {
      const index = this.caughtPokemons.findIndex(u => u === url);
      this.caughtPokemons.splice(index, 1);
    } else {
      this.caughtPokemons.push(url);
    }
    this.preserveData();
  }
}

