const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers/index");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const models = require("./models");
const helpers = require("./utils/helpers");

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({});

const sess = {
	secret: "Game Track",
	cookie: {
		maxAge: 24 * 60 * 60 * 1000,
		httpOnly: true,
		secure: false,
		sameSite: "strict",
	},
	resave: false,
	saveUninitialized: false,
	store: new SequelizeStore({
		db: sequelize,
	}),
};

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => {
		console.log("Now listening!");
	});
});
