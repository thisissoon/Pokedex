import { Component, OnInit } from '@angular/core';
import { pokemons } from '../pokemon-list/pokemon-list.mock-data';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  pokemonLinks = pokemons;
  pokemonName = {
    name: 'squirtle'
  };
  pokemonNumber = {
    number: '007'
  };

  constructor() { }

  ngOnInit() {
  }

}
