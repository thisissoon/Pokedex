import { Component, OnInit, OnDestroy } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { PokemonDetailQuery, PokemonNameFragment, PokemonNumberFragment, PokemonLinkFragment } from '../../apollo/operation-result-types';
import { Subject } from 'rxjs/Subject';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { pokemonDetailQuery } from './pokemon-detail.graphql';
import { ApolloClientService } from '../../apollo/apollo-client.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit, OnDestroy {


  public loading = false;
  private loading$: Subject<boolean> = new Subject<boolean>();
  private queryRef: QueryRef<PokemonDetailQuery>;
  public pokemonName: PokemonNameFragment;
  public pokemonNumber: PokemonNumberFragment;
  public pokemonLinks: PokemonLinkFragment[] = new Array(3).fill(undefined);
  private unSubscribe$: Subject<boolean> = new Subject<boolean>();
  private id: string;

  constructor(
    private apolloClientService: ApolloClientService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    // subject and debounce used to reduce flickering of loading state.
    this.loading$
      .pipe(debounceTime(100))
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe(loading => this.loading = loading);

    // route param events (i.e when user navigates between pages)
    // used to trigger fetching and refecthing of data as Angular
    // ngOnInit will not be involed when Angular reuses components
    // between routes.
    this.route.paramMap
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe(params => {
        this.id = params.get('id');
        if (this.queryRef) {
          this.reFetch();
          return;
        }
        this.initialFetch();
      });
  }

  // initial fetch creates and subscribes to an apollo query ref
  // (can be used to refecth later) and also makes
  // a data request
  initialFetch() {
    this.loading$.next(true);
    this.queryRef = this.apolloClientService.apollo.watchQuery<PokemonDetailQuery>({
      query: pokemonDetailQuery,
      variables: {
        id: this.id
      },
      errorPolicy: 'all'
    });
    this.queryRef
      .valueChanges
      .pipe(takeUntil(this.unSubscribe$))
      // fake bad network
      .pipe(debounceTime(100))
      .subscribe(({ data, errors, loading, networkStatus, stale }) => {
        this.loading = loading;
        this.pokemonName = data.pokemonName;
        this.pokemonNumber = data.pokemonNumber;
        this.pokemonLinks = data.pokemonLinks;
      }, (err) => {
        console.log(err);
      });
  }

  // reuses apollo query ref to update stale data on route change
  reFetch() {
    this.loading$.next(true);
    this.queryRef.setVariables({ id: this.id });
    this.queryRef.refetch();
  }

  // unsubscribes from all overservables.
  ngOnDestroy() {
    this.unSubscribe$.next(true);
    this.unSubscribe$.complete();
  }

}
