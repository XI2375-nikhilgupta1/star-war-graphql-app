# star-war-graphql-app

Full stack Node-React GraphQL App

Folder Structure

.gitignore
README.md
client
   |-- .eslintignore
   |-- .eslintrc.json
   |-- .gitignore
   |-- .prettierignore
   |-- .prettierrc.json
   |-- README.md
   |-- build
   |-- package-lock.json
   |-- package.json
   |-- public
   |   |-- index.html
   |-- src
   |   |-- App.tsx
   |   |-- assets
   |   |-- components
   |   |   |-- CharacterCard.tsx
   |   |   |-- TransportList.tsx
   |   |   |-- global
   |   |   |   |-- Loader.tsx
   |   |   |   |-- loader.css
   |   |-- helpers
   |   |   |-- util.ts
   |   |-- hooks
   |   |   |-- character.ts
   |   |   |-- home.ts
   |   |-- index.css
   |   |-- index.tsx
   |   |-- interfaces.ts
   |   |-- logo.svg
   |   |-- pages
   |   |   |-- character.tsx
   |   |   |-- home.tsx
   |   |   |-- index.tsx
   |   |-- queries.ts
   |   |-- react-app-env.d.ts
   |   |-- reportWebVitals.ts
   |   |-- setupTests.ts
   |-- tailwind.config.js
   |-- tsconfig.json
package-lock.json
package.json
src
   |-- dataSources
   |   |-- character-api.js
   |-- index.js
   |-- resolvers.js
   |-- schema.js


Install Modules
npm i (installs all backend required packages)

#Below command can be skipped if user wants to serve index.html from client/build instead of live server
cd client && npm i (installs all frontend required packages)


Instructions to run code(root directory)


To run backend 
npm run dev -> Runs backend at port :4000/api (all other routes will handle react routes and public folder)
# above command should be used to run fullstack-app both client/server hosted at single port

npm run client -> Runs client at port 3000(React Dev mode)
npm run dev:all -> Runs client at port 3000 and backend at port 4000 (React and Node Dev mode)
