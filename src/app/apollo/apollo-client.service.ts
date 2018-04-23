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

    this.initialised = true;
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
