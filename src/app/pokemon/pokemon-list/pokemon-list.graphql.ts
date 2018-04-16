import gql from 'graphql-tag';

export const fragmentPokemonLink = gql`
  fragment PokemonLink on Pokemon {
    id
    name
  }
`;

export const pokemonListQuery = gql`
  query PokemonList {
    pokemons (first: 4) {
      ...PokemonLink
    }
  }
  ${fragmentPokemonLink}
`;
