import { Component, OnInit, OnDestroy } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { PokemonListQuery, PokemonLinkFragment } from '../../apollo/operation-result-types';
import { pokemonListQuery } from './pokemon-list.graphql';
import { ApolloClientService } from '../../apollo/apollo-client.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit, OnDestroy {

  private unSubscribe$: Subject<boolean> = new Subject<boolean>();
  public loading: boolean;
  private queryRef: QueryRef<PokemonListQuery>;
  public pokemons: PokemonLinkFragment[] = new Array(3).fill(undefined);

  constructor(
    private apolloClientService: ApolloClientService
  ) { }

  ngOnInit() {
    this.initialFetch();
  }

  // Initial fetch broken out into own function so that refetch
  // can be called seperately if required.
  // apolloc client service apollo getter used instead of directly
  // injecting apollo.
  initialFetch() {
    this.loading = true;
    this.queryRef = this.apolloClientService.apollo.watchQuery<PokemonListQuery>({
      query: pokemonListQuery,
      errorPolicy: 'all'
    });
    this.queryRef
      .valueChanges
      .pipe(takeUntil(this.unSubscribe$))
      // fake bad network
      .pipe(debounceTime(100))
      .subscribe(({ data, errors, loading, networkStatus, stale }) => {
        this.loading = loading;
        this.pokemons = data.pokemons;
      }, (err) => {
        console.log(err);
      });
  }

  // unsubscribes from all overservables.
  ngOnDestroy() {
    this.unSubscribe$.next(true);
    this.unSubscribe$.complete();
  }

}
