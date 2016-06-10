
const bcrypt = require("bcrypt-then");
const app = require("koa")();
const router = require("koa-router")();
const r = require("rethinkdbdash")({db: "happytracks"});

app.use(require("koa-bodyparser")());
// app.use(require("koa-validate")());

router.get("/test", function*() {
	this.body = yield r.db("rethinkdb").table("stats");
});

router.post("/api/users", function*() {
	let {email, first, last, password, confirm} = this.request.body;

	this.body = yield r.table("users").insert({
		email: email,
		first: first,
		last: last,
		password: yield bcrypt.hash(password)
	});
});

app.use(require('koa-static')(__dirname + "/public"));
app.use(router.routes());
app.listen(8000);