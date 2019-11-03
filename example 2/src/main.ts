import './polyfills';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import  express from "express";

// const express = require('express');
const app = express();
const users_path = require('./app/users/user.controller');

platformBrowserDynamic().bootstrapModule(AppModule);
//
// app.use('/users', users_path);
//
// const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
// const server = app.listen(port, function () {
//     console.log('Server listening on port ' + port);
// });
