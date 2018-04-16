import gql from 'graphql-tag';
import { fragmentPokemonName } from '../pokemon-name/pokemon-name.graphql';
import { fragmentPokemonNumber } from '../pokemon-number/pokemon-number.graphql';
import { fragmentPokemonLink } from '../pokemon-list/pokemon-list.graphql';

export const pokemonDetailQuery = gql`
  query PokemonDetail ($id: String!) {
    pokemonName: pokemon(id: $id) {
      ...PokemonName
    }
    pokemonNumber: pokemon(id: $id) {
      ...PokemonNumber
    }
    pokemonLinks: pokemons(first: 4) {
      ...PokemonLink
    }
  }
  ${fragmentPokemonName}
  ${fragmentPokemonNumber}
  ${fragmentPokemonLink}
`;
