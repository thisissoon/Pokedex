import gql from 'graphql-tag';

export const fragmentPokemonNumber = gql`
  fragment PokemonNumber on Pokemon {
    number
  }
`;
