// import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloServer } from 'apollo-server-express';
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import typeDefs from './schema.js';
import resolvers from './resolvers.js';
import express from 'express';
import CharacterAPI from './dataSources/character-api.js';
import path from 'path';

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
    const server = new ApolloServer({ 
        typeDefs, 
        resolvers,
        dataSources: {
            characterApi: new CharacterAPI({ }),
        }
    });

    // Initialize an Express application
    const app = express();
    const __dirname = path.resolve(path.dirname(''))
// Apply the Apollo GraphQL middleware to the Express server
    server.start().then(() => {
        server.applyMiddleware({ app, path: '/api'  });
    
        // Serve static files from the React app
        app.use(express.static(path.join(__dirname, 'client/build')));
    
        // Serve the React app for any unknown routes
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
        });
    
        // Start the server
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}${server.graphqlPath}`);
        });
    });

    // const { url } = await startStandaloneServer(server, {
    //     context: async () => {
    //         const { cache } = server;

    //         return {
    //             dataSources: {
    //                 characterApi: new CharacterAPI({ cache }),
    //             },
    //         };
    //     }
    // });

    // console.log(`
    //     🚀  Server is running
    //     📭  Query at ${url}
    //   `);
};

startApolloServer();