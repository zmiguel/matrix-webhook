var express = require('express');
var matrix = require('matrix-js-sdk');
var path = require('path');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var config = {}
try {
    var settings = require('./config/settings.json');
    try{
        config.baseUrl = settings.baseUrl;
        config.accessToken = settings.accessToken;
        config.userId = settings.userId;
        config.roomId = settings.roomId;
        config.password = settings.password;
    } catch (error){
        console.log("Your settings.json file is missing some options!");
        process.exit(1);
    }
} catch (error) {
    if(process.env.BASE_URL == undefined || process.env.BASE_URL == "") {
        console.log("Please set BASE_URL in config/settings.json or in the environment");
        process.exit(1);
    }
    config.baseUrl = process.env.BASE_URL;
    if(process.env.ACCESS_TOKEN == undefined || process.env.ACCESS_TOKEN == "") {
        console.log("Please set ACCESS_TOKEN in config/settings.json or in the environment");
        process.exit(1);
    }
    config.accessToken = process.env.ACCESS_TOKEN;
    if(process.env.USER_ID == undefined || process.env.USER_ID == "") {
        console.log("Please set USER_ID in config/settings.json or in the environment");
        process.exit(1);
    }
    config.userId = process.env.USER_ID;
    if(process.env.ROOM_ID == undefined || process.env.ROOM_ID == "") {
        console.log("Please set ROOM_ID in config/settings.json or in the environment");
        process.exit(1);
    }
    config.roomId = process.env.ROOM_ID
    if(process.env.PASSWORD == undefined || process.env.PASSWORD == "") {
        console.log("Please set PASSWORD in config/settings.json or in the environment");
        process.exit(1);
    }
    config.password = process.env.PASSWORD;
} 

var app = express();

app.locals.chat = matrix.createClient({
    baseUrl: config.baseUrl,
    accessToken: config.accessToken,
    userId: config.userId
});

app.locals.chat.startClient();

app.locals.chat.once('sync', function(state, prevState, res) {
    if(state === 'PREPARED') {
        console.log("[MATRIX] Prepared");
    } else {
        console.log("[MATRIX] " + state);
        process.exit(1);
    }
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

module.exports = app;
