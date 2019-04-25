/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : rak3rman-landing/routes/mainRoutes.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/
let fs = require('fs');

//Home Page Route - Main
exports.homeRoute = function (req, res) {
    res.render('pages/home.ejs', {title: 'Home'})
};

//CSS Route
exports.cssRoute = function (req, res) {
    let content = fs.readFileSync('./assets/' + req.params.file, {encoding: 'utf-8'});
    res.render('pages/serve_text.ejs', {content: content})
};

//JS Route
exports.jsRoute = function (req, res) {
    res.render('pages/serve_text.ejs', {file: req.params.file})
};

//IMG Route
exports.imgRoute = function (req, res) {
    res.render('pages/serve_image.ejs', {file: req.params.file})
};

//req.params.deviceId