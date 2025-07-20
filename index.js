const express = require('express');
require('dotenv').config();
const database = require("./config/database");
const methodOverride = require('method-override');

const clientRoute = require("./routers/client/index.route");
const adminRoute = require("./routers/admin/index.route");

const systemConfig = require("./config/system");
const flash = require("express-flash");
const session = require("express-session");

database.connect();

const app = express()
const port = process.env.PORT;


app.use(methodOverride('_method'));
// use to handling HTML form submissions (method POST) (input: username=abc&pass=123)
app.use(express.urlencoded({extended: 'false'}));
// JSON API calls (ex: fetch) (input: {"username":"abc"})
app.use(express.json());

// Flash
app.use(session({  
  secret: 'quyentran',
  resave: false,
  saveUninitialized: true,
  maxAge: 60000
}));
app.use(flash());
// End Flash


app.set('views', './views'); 
app.set('view engine', 'pug');

// App locals variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.static('public'));

clientRoute(app);
adminRoute(app);


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
 