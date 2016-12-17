import 'reflect-metadata';
import * as restify from 'restify';
import { ApiGatewayRestifyServer } from './src/gateway.server';

// get kernel config
import { kernel } from './src/_ioc/ioc.conf';

// import the loader for all features
import './src/_ioc/ioc.loader';

// create server and set up app
const serverInstance = new ApiGatewayRestifyServer(kernel);
serverInstance.build();

console.dir(serverInstance);

export const server = serverInstance;


// require('./src/local.server');