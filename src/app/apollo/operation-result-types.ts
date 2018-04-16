/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface PokemonDetailQueryVariables {
  id: string,
};

export interface PokemonDetailQuery {
  pokemonName:  {
    // The name of this Pokémon
    name: string | null,
  } | null,
  pokemonNumber:  {
    // The identifier of this Pokémon
    number: string | null,
  } | null,
  pokemonLinks:  Array< {
    // The ID of an object
    id: string,
    // The name of this Pokémon
    name: string | null,
  } | null > | null,
};

export interface PokemonListQuery {
  pokemons:  Array< {
    // The ID of an object
    id: string,
    // The name of this Pokémon
    name: string | null,
  } | null > | null,
};

export interface PokemonLinkFragment {
  // The ID of an object
  id: string,
  // The name of this Pokémon
  name: string | null,
};

export interface PokemonNameFragment {
  // The name of this Pokémon
  name: string | null,
};

export interface PokemonNumberFragment {
  // The identifier of this Pokémon
  number: string | null,
};
