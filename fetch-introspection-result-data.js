const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const assets_folder = path.join(
  process.cwd(),
  'dist',
  'server',
  'assets'
);

fetch('https://graphql-pokemon.now.sh', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `
  })
})
.then(result => result.json())
.then(result => {
  // here we're filtering out any type information unrelated to unions or interfaces
  const filteredData = result.data.__schema.types.filter(
    type => type.possibleTypes !== null,
  );
  result.data.__schema.types = filteredData;
  const fileAsString =
    `
/* tslint:disable */

import { IntrospectionResultData } from 'apollo-cache-inmemory';

export const introspectionQueryResultData: IntrospectionResultData = ${JSON.stringify(result.data)}`
  fs.writeFile(__dirname + '/src/app/apollo/fragment-types.ts', fileAsString, err => {
    if (err) {
      console.error('Error writing fragment-types file', err);
    }
    console.log('Fragment types successfully extracted!');
  });
});
