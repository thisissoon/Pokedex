import { Component, OnInit } from '@angular/core';
import { pokemons } from './pokemon-list.mock-data';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  pokemons = pokemons;

  constructor() { }

  ngOnInit() {
  }

}
