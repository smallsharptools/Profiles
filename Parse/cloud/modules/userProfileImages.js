/*jslint white: true, browser: true, devel: true, windows: true, forin: true, vars: true, nomen: true, plusplus: true, bitwise: true, regexp: true, sloppy: true, indent: 4, maxerr: 50, unused: false */
/*global Parse: true, require: true, console: true */
    
var UserProfile = Parse.Object.extend("UserProfile");
var UserProfileImage = Parse.Object.extend("UserProfileImage");
var UserProfileType = Parse.Object.extend("UserProfileType");
var Tag = Parse.Object.extend("Tag");
var Location = Parse.Object.extend("Location");
var FeatureSchedule = Parse.Object.extend("FeatureSchedule");

var PR = require('cloud/modules/shared.js').PR;

var log = function(message) {
    console.log(message);
};

var CloudCodeFunctions = {
    
    // TODO create the following functions
    
};

for (var key in CloudCodeFunctions) {
    Parse.Cloud.define(key, CloudCodeFunctions[key]);
}

