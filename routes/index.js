/**
folder structure /routes
index.js is entry and handle all routes
root.js is the root of project /
home.js like one of routes URL /home
every route file should exports config, path 
*/

const express = require('express');
const path = require('path');
const fs = require('fs');

module.exports = (app) => {
    fs.readdirSync(__dirname).forEach((file) => {
        if (file === 'index.js') return;
        const router = express.Router();
        const routeModule = require(path.join(__dirname, file));

        const pathFile = routeModule.path || '/';
        const route = routeModule.config(router);

        app.use(pathFile, route);
    });
};
