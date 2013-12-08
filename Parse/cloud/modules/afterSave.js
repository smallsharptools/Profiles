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

var AfterSaveFunctions = {
    
    UserProfile : function(request) {
        // take the first and last name and update fullName in Parse.User 
        var userProfile = request.object;
        var firstName = userProfile.get("firstName");
        var lastName = userProfile.get("lastName");
        
        Parse.Cloud.useMasterKey();
        
        var query = new Parse.Query(Parse.User);
        var userRef = userProfile.get("user");
        
        if (userRef) {
            query.get(userRef.id).then(function(user) {
                if (user) {
                    user.set('fullName', firstName + ' ' + lastName);
                    return user.save();
                }
            });
        }
        else {
            console.warn("UserProfile does not have a reference to user.");
        }
    }
    
};

for (var key in AfterSaveFunctions) {
    Parse.Cloud.afterSave(key, AfterSaveFunctions[key]);
}
