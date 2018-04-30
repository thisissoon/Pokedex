# Pokedex

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.4 and created to demonstrate implementations of a few recently encountered technologies.

## Features

Following section titles can be used to search commit history for changes specific to each feature.

This project also includes comments to help explain what some sections of code do and how they relate to each of the below features.

### Change docs

[Commitizen CLI](https://github.com/commitizen/cz-cli) used to enforce commit message structure and [conventional changelog standard version](https://github.com/conventional-changelog/standard-version) used to bump versions and auto generate a meaningful changelog.

These tools were installed locally ([commitizen](https://github.com/commitizen/cz-cli#optional-install-and-run-commitizen-locally), [standard-version](https://github.com/conventional-changelog/standard-version)) and are executed via npm scripts.

This setup should make projects easier to approach for new team members.

This project also roughly follows [GitFlow](https://datasift.github.io/gitflow/IntroducingGitFlow.html) although not a highlighted feature of this project.

### App structure

The Angular CLI is used to it's fullest to generate project files (modules, components, service etc).

The file and folder structure generally follow: resource (e.g Pokemon) > pages (list and detail) > nested components (Pokemon name).

This results in a folder for each resource (e.g Pokemon). Within these folders there is one module, one routing module and as many components used exclusively by pages focused on that resource (e.g Pokemon detail view, name and number components).

Routed components (e.g Pokemon detail) can house nested components in their folders and will be used for data fetching and distributing.

### Server side rendering (SSR)

Server side rendering is where a client requests a route and the related view is rendered on the server (as opposed to by the client) and returned as the server's response.

This is achieved by creating an express web-server and using an Angular templating engine which takes a route and a bundled Angular application and returns a rendered view.

For the most part [this guide](https://angular.io/guide/universal) can be followed (and referred to for more detail), however this project has implemented server side rendering slightly differently:

1. Install tsloader v3.5.0 to avoid errors.
2. No need to edit services.
3. An `AppBrowserModule` is used and bootstrapped in `main.ts`.
4. `initialNavigation` disabled in `AppRoutingModule` to prevent body of app refreshing when client takes over from a server rendered view.
5. Npm scripts renamed from `universal` to `ssr`.

Once the above is completed `npm run build:ssr` and `npm run serve:ssr` can be run and when `http://localhost:4000/` is visited the initial request in chrome dev tools should contain a fully rendered HTML page as opposed to a pre Angular bootstrap one.

### GraphQL codegen (schema types, query autocompletion, query result types)

It is possible to inspect a GraphQL endpoint for it's schema with [GraphQL CLI](https://github.com/graphql-cli/graphql-cli). This schema can then be used by [GraphQL for VScode](https://marketplace.visualstudio.com/items?itemName=kumar-harsh.graphql-for-vscode) to lint and autocomplete [gql tagged](https://github.com/apollographql/graphql-tag) queries. Furthermore, given these correctly typed queries, it is possible to generate response types with [Apollo codegen](https://github.com/apollographql/apollo-codegen).

1. Install [GraphQL for VScode](https://marketplace.visualstudio.com/items?itemName=kumar-harsh.graphql-for-vscode) and copy this project's `.gqlconfig' to loosen the GraphQL linter.
2. Run `npm i --save graphql-tag` and create fragments for each nested component and queries for each routed component (see this project's Pokemon fragments and queries)
3. Use the GraphQL CLI to download GraphQL schema. Run `npm i --save-dev graphql-cli`, add `"schema:gql": "graphql get-schema -e https://graphql-pokemon.now.sh -o ./schema.graphql",` to your `package.json` and run `npm run schema:gql`. Remove all comments from the generated schema file.
4. The GraphQL for VScode plugin should now provide some linting and autocompletion for gql tagged strings. If not, check `schema.graphql` from errors and restart VScode.
5. Use Apollo codegen to create query response types based on an introspection schema and gql tagged strings.

### Apollo

For the most part [this guide](https://www.apollographql.com/docs/angular/basics/setup.html) was followed with the following deviations / enhancements:

1. `"esnext.asynciterable"` added to the `lib` array in `tsconfig.json` to prevent the build from breaking after the required npm packages have been installed.
2. Apollo client initialisation logic broken out into it's own service to allow for more control over when the client is initialised (import when pairing Apollo with an Angular `APP_INITIALIZER` for runtime configuration.
3. `fetch-introspection-result-data.js` script used to introspect GraphQL endpoint to allow for more complex Apollo queries.
4. Basic loading styling and logic has been implemented at component level as pages and components will render before data is present and to prevent loading states from flickering.

### State transfer

Angular state transfer allows responses received by Angular to be stored in a key value object at the bottom of it's rendered html pages. This means responses received by Angular when running as a template engine on the server can be stored and used by Angular when that same route is run on the browser. This prevents duplicate requests (once on the server and again on the browser).

1. Import `ServerTransferStateModule` into `AppServerModule`. This should result in an empty state object at the bottom of pages rendered by the server. Build, serve and inspect initial server html responses from the server to view the object. The Angular guide recommends to also import `BrowserTransferStateModule` however it doesn't seem to be required for this app.
2. `npm i --save @nguniversal/common` and import `TransferHttpCacheModule` in app module to allow access to state in Angular application. [More info](https://github.com/angular/universal/tree/master/modules/common).
3. In `ApolloClientService` either transfer Apollo cache to Angular state or Angular state to Apollo cache depending on wether on server or on browser. This will result in data being visible at bottom of ssr pages.
4. Finally we need to ensure client app bootstraps after the DOM has loaded (and hence state at bottom of html docs). Add a `document.loaded` event listener in `main.ts` to achieve this.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artefacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
