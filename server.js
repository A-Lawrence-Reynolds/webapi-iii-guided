const express = require("express"); // importing a CommonJS module
const helmet = require("helmet");

const hubsRouter = require("./hubs/hubs-router.js");

const server = express();

function logger(req, res, next) {
  console.log(`${req.method} to {req.originalUrl}`);
  next();
}

function auth(req, res, next) {
  if (req.url === "/mellon") {
    next();
  } else {
    res.send("no pass for you");
  }
}

server.use(helmet());
server.use(express.json());
server.use(logger);
server.use("/api/hubs", hubsRouter);

server.get("/mellon", auth, (req, res) => {
  console.log("open");
  console.log("safe in side gate");
  res.get("/area51");
});

server.get("/", (req, res) => {
  const nameInsert = req.name ? ` ${req.name}` : "";

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

server.get("/echo", (req, res) => {
  res.send(req.headers);
});

server.get("/area51", helmet(), (req, res) => {
  res.send(req.headers);
});
module.exports = server;
