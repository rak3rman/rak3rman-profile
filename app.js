/*\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
App/Filename : rak3rman-profile/app.js
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
let cmd = require('node-cmd');
let crypto = require('crypto');

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
//Webhook Secret Check
let webhook_secret = storage.get('webhook_secret');
if (webhook_secret === undefined) {
    let newSecret = uuidv4();
    storage.set('webhook_secret', newSecret);
    console.log('Config Manager: Webhook Secret Set to DEFAULT: ' + newSecret);
}
//Production Check
let production = storage.get('production');
if (production === undefined) {
    storage.set('production', false);
    console.log('Config Manager: Production to DEFAULT: false');
}
//Construction Check
let construction = storage.get('construction');
if (construction === undefined) {
    storage.set('construction', true);
    console.log('Config Manager: Construction to DEFAULT: true');
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
if (storage.get('construction') === true) {
    app.get('/', mainRoutes.constructionRoute);
} else {
    app.get('/', mainRoutes.homeRoute);
    app.get('/contact', mainRoutes.redirRoute);
}
app.post('/api/webpage/update', function (req, res) {
    let hmac = crypto.createHmac('sha1', storage.get('webhook_secret'));
    hmac.update(JSON.stringify(req.body));
    let calculatedSignature = 'sha1=' + hmac.digest('hex');
    if (req.headers['x-hub-signature'] === calculatedSignature && storage.get('production') === true) {
        console.log("Webhook Handler | Update Request Received");
        cmd.get(
            "cd rak3rman-profile; git pull; npm install; pm2 restart rak3rman-profile",
            function(err, data, stderr){
                console.log("Webhook Handler | Restart in Progress: " + data);
                console.log("Webhook Handler | ERROR: " + err);
            }
        );
        res.json({
            message: 'Received'
        });
    } else {
        console.log("Webhook Handler | Invalid Token or Not in Production Mode");
        res.json({
            message: 'Invalid Request'
        });
    }
});

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

//Port Listen
let http = require('http');
let server = http.createServer(app);
server.listen(storage.get('console_port'), function () {
    console.log(' ');
    console.log('======================================');
    console.log('   RAK3RMAN PROFILE | RAk3rman 2019   ');
    console.log('======================================');
    console.log('Server Accessible at: http://' + ip.address() + ":" + storage.get('console_port'));
    console.log(' ');
});

//End of External Connections Setup - - - - - - - - - -

//Export Express
module.exports = app;
