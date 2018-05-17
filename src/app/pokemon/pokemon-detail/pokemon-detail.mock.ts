import { PokemonDetailQuery } from '../../apollo/operation-result-types';
import { mockPokemonName } from '../pokemon-name/pokemon-name.mock';
import { mockPokemonLinks } from '../pokemon-list/pokemon-list.mock';
import { mockPokemonNumber } from '../pokemon-number/pokemon-number.mock';

export const mockPokemonDetail: PokemonDetailQuery = {
  pokemonName: mockPokemonName,
  pokemonLinks: mockPokemonLinks,
  pokemonNumber: mockPokemonNumber
};
