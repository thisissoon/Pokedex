import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { PokemonNameComponent } from './pokemon-name/pokemon-name.component';
import { PokemonNumberComponent } from './pokemon-number/pokemon-number.component';

@NgModule({
  imports: [
    CommonModule,
    PokemonRoutingModule
  ],
  declarations: [PokemonListComponent, PokemonDetailComponent, PokemonNameComponent, PokemonNumberComponent]
})
export class PokemonModule { }
