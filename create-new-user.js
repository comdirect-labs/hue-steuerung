#!/usr/bin/env node

var host = "192.168.x.y"; // IP von der Bridge hier eintragen!
var desc = ""; // Optionaler Beschreibungstext fuer den neuen User

var HueApi = require("node-hue-api").HueApi;
var hue = new HueApi();
hue.registerUser(host, desc)
    .then(res => console.log("New user: " + JSON.stringify(res)))
    .fail(err => console.log("Error: " + err))
    .done();

