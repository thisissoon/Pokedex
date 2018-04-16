import gql from 'graphql-tag';

export const fragmentPokemonName = gql`
  fragment PokemonName on Pokemon {
    name
  }
`;
