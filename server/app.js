// Importing express
import express from 'express';

// importing bodyparser
import bodyParser from 'body-parser';

// Defining the Port Variable
const port = process.env.PORT || 3000;

// Instantiating express
const app = new express();

// Registering middlewear bodyparser
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));


// Starting up the server
app.listen(port);

// Console message
console.log(`server running at http://localhost:${port}`);

export default app;
