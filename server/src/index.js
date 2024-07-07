import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from './schema.js';
import resolvers from './resolvers.js';

import CharacterAPI from './dataSources/character-api.js'

const mocks = {
    Query: () => ({
        charactersForHome: () => [...new Array(8)]
    }),
    Character: () => ({
        name: () => 'Hulk',
        birth_year: () => '1962',
        height: () => '162',
        url: () => 'https://swap.info/people/1'
    })
}

async function startApolloServer() {
    // const server = new ApolloServer({
    //     schema: addMocksToSchema({
    //         schema: makeExecutableSchema({ typeDefs }),
    //         mocks
    //     })
    // });
    const server = new ApolloServer({ typeDefs, resolvers });

    const { url } = await startStandaloneServer(server, {
        context: async () => {
            const { cache } = server;

            return {
                dataSources: {
                    characterApi: new CharacterAPI({ cache }),
                },
            };
        }
    });

    console.log(`
        🚀  Server is running
        📭  Query at ${url}
      `);
};

startApolloServer();