const app = require("koa")();
const router = require("koa-router")();

router.get("/test", function*(){
	this.body = {"test": "this works!"}
});

app.use(require('koa-static')(__dirname + "/public"));
app.use(router.routes());
app.listen(8000);