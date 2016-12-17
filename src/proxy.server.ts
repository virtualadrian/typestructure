import { Server } from 'tls';
import 'reflect-metadata';
import * as restify from 'restify';
import { InversifyRestifyServer } from 'inversify-restify-utils';
import * as AwsLambdaProxy from 'aws-serverless-express'

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

exports.handler = (event, context) => AwsLambdaProxy.proxy(server.build(), event, context);
