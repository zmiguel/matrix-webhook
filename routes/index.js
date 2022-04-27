var express = require('express');
var matrix = require('matrix-js-sdk');
var router = express.Router();

var config = {}
try {
    var settings = require('../config/settings.json');
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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).send("works!");
});

router.post('/', function(req, res, next) {

  if (req.body.password == config.password) {
    var content = {
      "body": req.body.msg,
      "msgtype": "m.text"
    };

    req.app.locals.chat.sendEvent(config.roomId, "m.room.message", content, "").then((mres) => {
      res.send(mres);
    }).catch((err) => {
      res.send(err);
    });
  } else {
    res.status(401).send("Unauthorized");
  }
});

module.exports = router;
