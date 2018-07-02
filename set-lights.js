#!/usr/bin/env node

var host = "192.168.x.y"; // IP von der Bridge hier eintragen!
var username = "...."; // generierte Username ID hier eintragen!

var HueApi = require("node-hue-api").HueApi;
var hue = require("node-hue-api");
var api = new HueApi(host, username);
var ls = hue.lightState.create();

var lightId = -1;

function printUsage() {
    console.log("USAGE: ./set-lights.js --id LIGHT_ID {--on|--off|--color R G B|--loop}");
}

for(var i = 2; i < process.argv.length; i++) {
    var argv = process.argv[i];
    switch(argv) {
        case "--id":
            lightId = process.argv[++i];
            break;

        case "--on":
            ls.on();
            break;

        case "--off":
            ls.off();
            break;

        case "--color":
            var r = process.argv[++i];
            var g = process.argv[++i];
            var b = process.argv[++i];
            ls.rgb(r, g, b);
            break;

        case "--loop":
            ls.colorLoop();
            break;

        default:
            console.log("Unknown argument: " + argv);
            printUsage();
            process.exit(1);
            break;
    }
}

if(lightId < 0 && process.argv.length < 5) {
    printUsage();
    process.exit(1);
}


api.setLightState(lightId, ls)
    .then(res => console.log(JSON.stringify(res, null, 2)))
    .fail(err => console.log("Error: " + err))
    .done();

