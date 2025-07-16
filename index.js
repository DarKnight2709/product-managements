const express = require('express');
require('dotenv').config();
const database = require("./config/database");

const clientRoute = require("./routers/client/index.route");
const adminRoute = require("./routers/admin/index.route");

database.connect();

const app = express()
const port = process.env.PORT;



app.set('views', './views'); 
app.set('view engine', 'pug');

app.use(express.static('public'));

clientRoute(app);
adminRoute(app);


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
 