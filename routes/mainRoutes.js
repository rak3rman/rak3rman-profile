/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : rak3rman-profile/routes/mainRoutes.js
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/

//Home Page Route
exports.homeRoute = function (req, res) {
    res.render('pages/home.ejs')
};

//Redirect Page Route
exports.redirRoute = function (req, res) {
    res.redirect('/');
};


//Construction Page Route
exports.constructionRoute = function (req, res) {
    res.render('pages/construction.ejs')
};
