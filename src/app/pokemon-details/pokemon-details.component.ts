import { Component, OnInit } from '@angular/core';
import { PokemonDetails } from '../pokemon-details';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {

  data: PokemonDetails = null;

  constructor() { }

  ngOnInit() {
  }

}
