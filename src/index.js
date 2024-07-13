import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schema.js';
import resolvers from './resolvers.js';
import express from 'express';
import CharacterAPI from './dataSources/character-api.js';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

(async () =>{
    const server = new ApolloServer({ 
        typeDefs, 
        resolvers,
        dataSources: ()=> ({
            characterApi: new CharacterAPI({ }),
        }),
        cache: 'bounded', 
    });

    // Initialize an Express application
    const app = express();
    const __dirname = path.resolve(path.dirname(''));
    // Apply the Apollo GraphQL middleware to the Express server
    server.start().then(() => {
        server.applyMiddleware({ app, path: '/api'  });
    
        // Serve static files from the React
        app.use(express.static(path.join(__dirname, 'client/build')));
    
        // Serve the React app for any unknown routes
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
        });
    
        // Start the server
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => {
            console.log(`
                🚀  Server is running
                📭  Query at http://localhost:${PORT}${server.graphqlPath}
              `);
       
        });
    });

})();
