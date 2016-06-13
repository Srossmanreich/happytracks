
const bcrypt = require("bcrypt-then");
const app = require("koa")();
const router = require("koa-router")();
const jwt = require("koa-jwt");
const r = require("rethinkdbdash")({db: "happytracks"});

const config = require("./config");

app.use(require("koa-bodyparser")());
require("koa-validate")(app);

router.get("/test", function*() {
	this.body = yield r.db("rethinkdb").table("stats");
});

router.post("/api/users", function*() {
	this.checkBody('email').isEmail("Please enter a real email");
	this.checkBody('first').notEmpty("Please enter your first name");
	this.checkBody('last').notEmpty("Please enter your first name");
	this.checkBody('password').notEmpty("Please enter a password");

	if (this.errors) {
        this.body = {success: false, errors: this.errors};
        return;
    }

	let {email, first, last, password, confirm} = this.request.body;
	let newUser = {
		email: email,
		first: first,
		last: last,
		password: yield bcrypt.hash(password)
	};

	let checkUser = yield r.table("users")
						   .getAll(email, {index: "email"})
						   .count().gt(0);

	if (checkUser) {
		this.body = {success: false, errors: [{email: "User already exists"}]};
		return;
	}

	let data = yield r.table("users")
	                  .insert(newUser, {returnChanges: true})("changes")("new_val")
	                  .without("password");

	this.body = {
		success: true,
		user: data,
		token: jwt.sign(email, config.jwtSecret)
	};
});

router.get("/api/test", jwt({secret: config.jwtSecret}), function*() {
	this.body = {success: "You passed the correct auth header"};
});

app.use(require('koa-static')(__dirname + "/public"));
app.use(router.routes());
app.listen(8000);
