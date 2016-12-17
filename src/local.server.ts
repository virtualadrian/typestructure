import 'reflect-metadata';
import * as restify from 'restify';
import { InversifyRestifyServer } from 'inversify-restify-utils';

// get kernel config
import { kernel } from './_ioc/ioc.conf';

// import the loader for all features
import './_ioc/ioc.loader';

// create server and set up app
const server = new InversifyRestifyServer(kernel);
server.setConfig((app) => {
  // use query string parser
  app.use(restify.queryParser());
  // use body parser
  app.use(restify.bodyParser());
});

// build and start listening on 9090
server.build().listen(9090, 'localhost');

// log port
console.log('APP LISTENTING ON: http://localhost:9090');
