// Importing express
import express from 'express';

// importing bodyparser
import bodyParser from 'body-parser';

// importring routes module
import routes from './routes';

// Defining the Port Variable
const port = process.env.PORT || 8020;

// Instantiating express
const app = new express();

// Registering middlewear bodyparser
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
routes(app);

// Starting up the server
app.listen(port);

// Console message
console.log(`server is running at http://localhost:${port}`);

export default app;
