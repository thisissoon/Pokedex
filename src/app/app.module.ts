import { BrowserModule } from '@angular/platform-browser';
import { NgModule, PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TransferHttpCacheModule } from '@nguniversal/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ApolloClientModule } from './apollo/apollo-client.module';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    // renderModule[Factory]() (used by the the express web server to render the app)
    // requires the use of BrowserModule.withServerTransition()
    // ensures the server rendered app can properly transitioned into a client app.
    // (e.g server styles and cache present in intial .html can be correctly tagged)
    BrowserModule.withServerTransition({appId: 'pokedex'}),
    AppRoutingModule,
    // Provides the ApolloClientService, and hnece the apollo
    // client instance to the entire app.
    ApolloClientModule,
    // TransferHttpCacheModule installs a Http interceptor that
    // avoids duplicate HttpClient requests on the client,
    // for requests that were already made when the application
    // was rendered on the server side.
    TransferHttpCacheModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  // Uses angular injection tokens to demonstrate when the app is running on the server
  // and the client. Notice that when serving ssr app console logs will be present
  // on both the server and the client.
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }
}
