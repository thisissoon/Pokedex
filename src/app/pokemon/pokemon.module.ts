import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';

@NgModule({
  imports: [
    CommonModule,
    PokemonRoutingModule
  ],
  declarations: [PokemonListComponent]
})
export class PokemonModule { }
