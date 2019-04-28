/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : rak3rman-landing/app.js
Description  : Initializes nodejs
Author       : RAk3rman
\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\*/

//===================================================//
//     --- Initialize Packages and Routers ---       //
//===================================================//

//Declare Packages
let express = require('express');
let session = require('express-session');
let morgan = require('morgan');
let createError = require('http-errors');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let ip = require('ip');
let uuidv4 = require('uuid/v4');
let fs = require('fs');

//Setup Local Database
let dataStore = require('data-store');
let storage = new dataStore({path: './config/sysConfig.json'});

//System Config Checks - - - - - - - - - - - - - - - - -
//Session Secret Check
let session_secret = storage.get('session_secret');
if (session_secret === undefined) {
    let newSecret = uuidv4();
    storage.set('session_secret', newSecret);
    console.log('Config Manager: Session Secret Set - ' + newSecret);
}
//Console Port Check
let console_port = storage.get('console_port');
if (console_port === undefined) {
    storage.set('console_port', 3000);
    console.log('Config Manager: Port Set to DEFAULT: 3000');
}
//Development Check
let dev_status = storage.get('dev_status');
if (dev_status === undefined) {
    storage.set('dev_status', true);
    console.log('Config Manager: Dev Status to DEFAULT: true');
}
//End of System Config Checks - - - - - - - - - - - - - -

//Declare App
const app = express();
app.set('view engine', 'ejs');

//Initialize Exit Options (for Testing Environments)
let exitOpt = require('./config/exitOpt.js');
setTimeout(exitOpt.testCheck, 3000);

//Routers
let mainRoutes = require('./routes/mainRoutes.js');

//Express Processes/Packages Setup
app.use(session({
    secret: storage.get('session_secret'),
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Import Asset Files to Web page
app.use('/assets', express.static(process.cwd() + '/assets'));

//End of Initialize Packages and Routers - - - - - - - -


//===================================================//
//     --- Asset Handler Config Routes/Logic  ---    //
//===================================================//

//Create Routes
app.get('/', mainRoutes.homeRoute);

//End of Asset Handler Config Routes/Logic - - - - - - - - -


//===================================================//
//              --- Error Handlers ---               //
//===================================================//

//404 - Send to Error Handler
app.use(function (req, res, next) {
    next(createError(404));
});

// Error Handler Logic
app.use(function (err, req, res, next) {
    //Determine Message
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    //Render Error Page
    res.status(err.status || 500);
    res.render('pages/error.ejs', {title: 'Error'});
});

//End of Error Handler - - - - - - - - - - - - - - - - -


//===================================================//
//        --- External Connections Setup ---         //
//===================================================//
console.log(' ');
console.log('======================================');
console.log('   RAK3RMAN LANDING | RAk3rman 2019   ');
console.log('======================================');
if (storage.get('dev_status') === false ) {
    //Setup HTTPS
    let key = fs.readFileSync('encryption/private.key');
    let cert = fs.readFileSync( 'encryption/primary.crt' );
    let ca = fs.readFileSync( 'encryption/intermediate.crt' );
    let options = {
        key: key,
        cert: cert,
        ca: ca
    };
    //Redirect HTTPS
    let forceSsl = require('express-force-ssl');
    app.use(forceSsl);
    //Start HTTPS Connection
    let https = require('https');
    let httpsserver = https.createServer(options, app);
    httpsserver.listen(443, function () {
        console.log('HTTPS Server Accessable at: https://' + ip.address() + ":443");
    });
}

//HTTP Port Listen
let http = require('http');
let httpserver = http.createServer(app);
httpserver.listen(storage.get('console_port'), function () {
    console.log('Development Server Accessable at: http://' + ip.address() + ":" + storage.get('console_port'));
    console.log(' ');
});

//End of External Connections Setup - - - - - - - - - -

//Export Express
module.exports = app;
