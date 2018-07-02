#!/usr/bin/env node

var hue = require("node-hue-api");

var displayBridges = function(bridge) {
	console.log(JSON.stringify(bridge));
};

// --------------------------
// Using a promise
hue.nupnpSearch().then(displayBridges).done();

