#!/usr/bin/env node

var host = "192.168.x.y"; // IP von der Bridge hier eintragen!
var username = "...."; // generierte Username ID hier eintragen!

var HueApi = require("node-hue-api").HueApi;
var api = new HueApi(host, username);

api.lights()
    .then(res => console.log(JSON.stringify(res, null, 2)))
    .fail(err => console.log("Error: " + err))
    .done();

