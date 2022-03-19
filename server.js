"use strict";
/**
 * import npm modules
 */
const fs = require('fs')
const cors = require('cors')
const path = require('path')
const http = require('http');
const express = require('express')
const session = require("express-session");
const bodyParser = require('body-parser');
const morgan = require('morgan')
const dotenv = require('dotenv')
const routers = require("./router");
const {v4 : uuidV4} = require("uuid");
const crypto = require("crypto");
var _ = require('lodash')
dotenv.config()
/**
 * import user defined moudles
 */

 const mongoose = require('./utils/database')

run().catch((e) => console.error(e));

async function run() {
  let app = express();
  app.use(express.json());
  app.use(cors())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(morgan('dev'))
app.use("/api", routers.authAdmin);
app.use("/api", routers.authUser);
app.use("/api", routers.customer)
app.use("/api", routers.pet)
  const server = http.createServer( app )
  server.listen(process.env.PORT, () => {
      console.log(`Listening on http://${process.env.LISTEN_IP}:${process.env.PORT}`);
  });
}