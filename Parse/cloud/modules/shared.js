/*jslint white: true, browser: true, devel: true, windows: true, forin: true, vars: true, nomen: true, plusplus: true, bitwise: true, regexp: true, sloppy: true, indent: 4, maxerr: 50, unused: false */
/*global Parse: true, require: true, console: true */
    
var UserProfile = Parse.Object.extend("UserProfile");
var UserProfileImage = Parse.Object.extend("UserProfileImage");
var UserProfileType = Parse.Object.extend("UserProfileType");
var Tag = Parse.Object.extend("Tag");
var Location = Parse.Object.extend("Location");
var FeatureSchedule = Parse.Object.extend("FeatureSchedule");

var log = function(message) {
    console.log(message);
};

var PR = {
    
    StatusOK : 'OK',
    
    isDevelopment : function() {
        var stagingApplicationId = '7WlNeYxwtpgk3RFsApLNNiRMA0uP7yR6N5GPg7XS';
        return Parse.applicationId === stagingApplicationId;
    },
    
    getBaseURL : function() {
        if (PR.isDevelopment()) {
            return 'http://profilesdev.parseapp.com/';
        }
        else {
            return 'http://profiles.parseapp.com/';
        }
    },
    
    eachItem : function (items, callback) {
        var index = 0;
        var promise = new Parse.Promise();
        
        var continueWhile = function(nextItemFunction, asyncFunction) {
            var item = nextItemFunction();
            if (item) {
                var innerPromise = asyncFunction(item);
                if (!Parse.Promise.is(innerPromise)) {
                    innerPromise = Parse.Promise.as();
                }
                
                innerPromise.then(function() {
                    continueWhile(nextItemFunction, asyncFunction);
                });
            }
            else {
                promise.resolve();
            }
        };
        
        var nextItem = function() {
            if (items && index < items.length) {
                var item = items[index];
                index++;
                return item;
            }
            else {
                return null;
            }
        };
        
        continueWhile(nextItem, callback);
        
        return promise;
    },
    
    arrayContainsItem : function(array, item, equalsFunction) {
        // True if item is in array
        var i = array.length;
        while (i--) {
            if (equalsFunction) {
                return equalsFunction(array[i], item);
            }
            else if (array[i] === item) {
                return true;
            }
        }
        return false;
    },
    
    arrayContainsOtherArray : function(array, otherArray) {
        /// True if each item in other array is in array
        var i = otherArray.length;
        while (i--) {
            if (!PR.arrayContainsItem(array, otherArray[i])) {
                return false;
            }
        }
        return true;
    },
    
    objectEquals : function(obj1, obj2) { 
        return obj1.id === obj2.id; 
    },
    
    fetchUser : function(userId) {
        var user = new Parse.User();
        user.id = userId;
    
        return user.fetch();
    },
    
    fetchUserByUsername : function(username) {
        var query = new Parse.Query(Parse.User);
        query.equalTo("username", username);
    
        return query.first();
    },
    
    fetchUserProfile : function(userProfileId) {
        var userProfile = new UserProfile();
        userProfile.id = userProfileId;
    
        return userProfile.fetch();
    },
    
    fetchUserProfileByUser : function(user) {
        var query = new Parse.Query(UserProfile);
        query.equalTo("user", user);
        return query.first();
    },
    
};

exports.PR = PR;
