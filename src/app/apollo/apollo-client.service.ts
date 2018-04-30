import { Injectable } from '@angular/core';
import { InMemoryCache, NormalizedCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { HttpLinkHandler, HttpLink } from 'apollo-angular-link-http';
import { Apollo } from 'apollo-angular';
import { TransferState, makeStateKey } from '@angular/platform-browser';

import { introspectionQueryResultData } from './fragment-types';

@Injectable()
export class ApolloClientService {

  cache: InMemoryCache;
  link: HttpLinkHandler;
  initialised = false;
  // key to store value in state transfer object at bottom of SSR
  // pages at bottom of doc.
  STATE_KEY = makeStateKey<any>('apollo.state');

  constructor(
    private apolloAngular: Apollo,
    private readonly state: TransferState,
    private httpLink: HttpLink
  ) { }

  init() {

    const fragmentMatcher = new IntrospectionFragmentMatcher({
      introspectionQueryResultData
    });

    // creating cache with a fragment matcher allows for more complex queries
    // of complex graphql endpoints.

    this.cache = new InMemoryCache({ fragmentMatcher });

    this.link = this.httpLink.create({ uri: 'https://graphql-pokemon.now.sh' });

    this.apolloAngular.create({
      link: this.link,
      cache: this.cache,
      ssrMode: true
    });

    // App deemed to be running on browser if there is apollo data in the
    // transfer state object.
    const isBrowser = this.state.hasKey<NormalizedCache>(this.STATE_KEY);

    if (isBrowser) {
      this.onBrowser();
    } else {
      this.onServer();
    }

    this.initialised = true;
  }

  onServer() {
    // store apollo cache into angular state to be used
    // by apollo when app runs on client
    this.state.onSerialize(this.STATE_KEY, () =>
      this.cache.extract()
    );
  }

  onBrowser() {
    // restore apollo cache from state stored when app was
    // ran on server
    const state = this.state.get<NormalizedCache>(this.STATE_KEY, null);
    this.cache.restore(<any>state);
  }

  // getter used to ensure apollo has been initialised
  // before being provided. If initialised in a module constructor
  // causes a circular dependence issue when using runtime config.

  get apollo(): Apollo {
    if (!this.initialised) {
      this.init();
    }
    return this.apolloAngular;
  }

}
