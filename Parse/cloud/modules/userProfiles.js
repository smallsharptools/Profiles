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
    // saveProfile (userId, firstName, lastName, birthDate, title, quote, bio, url1, url2, url3, isPublic, twitterName)
    // savePhoto (userId, type, width, height) (a user can up to 3 photos which can cycle through to add some activity, cropped to square, minimum size is 400x400 for retina displays at 200x200)
    // tagProfile (array of strings) (a list of predefined strings can help in the UI to use common tags)
    
};

for (var key in CloudCodeFunctions) {
    Parse.Cloud.define(key, CloudCodeFunctions[key]);
}
