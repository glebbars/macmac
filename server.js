const jsonServer = require("json-server");
const _ = require("lodash");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 5000;

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.patch("/patchcollection", (req, res) => {
  console.log("*");

  const db = router.db; // Assign the lowdb instance

  if (Array.isArray(req.body)) {
    req.body.forEach((element) => {
      insert(db, "posts", element);
    });
  } else {
    insert(db, "posts", req.body);
  }

  res.sendStatus(200);

  function insert(db, collection, data) {
    console.log(data.id);
    const table = db.get(collection);

    if (table.find({ id: data.id }).value()) {
      table
        .find({ id: data.id })
        .assign(_.omit(data, ["_id"]))
        .write();
    }
  }
});

server.use(router);

server.listen(port);
