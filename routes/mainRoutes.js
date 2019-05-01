/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : rak3rman-profile/routes/mainRoutes.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/

//Home Page Route
exports.homeRoute = function (req, res) {
    res.render('pages/home.ejs')
};

//About Page Route
exports.aboutRoute = function (req, res) {
    res.render('pages/about.ejs')
};

//Projects Page Route
exports.projectsRoute = function (req, res) {
    res.render('pages/projects.ejs')
};

//Contact Page Route
exports.contactRoute = function (req, res) {
    res.render('pages/contact.ejs')
};
