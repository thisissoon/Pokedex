# Pokedex

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.4 and created to demonstrate implementations of a few recently encountered techonlogies.

## Features

Following section titles can be used to search commit history for changes specific to each feature.

This project also includes extensive comments to help explain what each section of code does and how they relate to each of the below features.

### Change docs

[Commitizen CLI](https://github.com/commitizen/cz-cli) used to enforce commit message structure and [conventional changelog standard version](https://github.com/conventional-changelog/standard-version) used to bump versions and auto generate a meaningful changelog.

These tools were installed locally ([commitizen](https://github.com/commitizen/cz-cli#optional-install-and-run-commitizen-locally), [standard-version](https://github.com/conventional-changelog/standard-version)) and are executed via npm scripts.

This setup should make projects easier to approach for new team members.

This project also roughly follows [GitFlow](https://datasift.github.io/gitflow/IntroducingGitFlow.html) although not a highlighted feature of this project.

### App structure

The Angular CLI is used to it's fullist to generate project files (modules, components, service etc).

The file and folder structure generally follow: reasource (e.g pokemon) > pages (list and detail) > nested components (pokemon name).

This results in a folder for each resource (e.g pokemon). Within these folders there is one module, one routing module and as many components used exlusively by pages focused on that resource (e.g pokemon detail view, name and number components).

Routed components (e.g pokemon detail) can house nested components in thier folders and will be used for data fetching and distributing.

### Server side rendering (SSR)

Server side rendering is where a client requests a route and the related view is rendered on the server (as opposed to by the client) and returned as the server's response.

This is achieved by creating an express webserver and using an Angular templating engine which takes a route and a bundled Angular application and returns a rendered view.

For the most part [this guide](https://angular.io/guide/universal) can be followed (and referred to for more detail), however this project has implemented server side rendering slightly differently:

1. Install tsloader v3.5.0 to avoid errors.
2. No need to edit services.
3. An `AppBrowserModule` is used and bootstrapped in main.ts.
4. `initialNavigation` disabled in `AppRoutingModule` to prevent body of app refreshing when client takes over from a server rendered view.
5. Npm scripts renamed from `universal` to `ssr`.

Once the above is completed `npm run build:ssr` and `npm run serve:ssr` can be run and when `http://localhost:4000/` is visited the initial request in chrome dev tools should contain a fully rendered HTML page as opposed to a pre Angular bootstrap one.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
