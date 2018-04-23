import gql from 'graphql-tag';

export const fragmentPokemonLink = gql`
  fragment PokemonLink on Pokemon {
    id
    name
  }
`;

export const pokemonListQuery = gql`
  query PokemonList {
    pokemons (first: 3) {
      ...PokemonLink
    }
  }
  ${fragmentPokemonLink}
`;
