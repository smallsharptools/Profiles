/*jslint white: true, browser: true, devel: true, windows: true, forin: true, vars: true, nomen: true, plusplus: true, bitwise: true, regexp: true, sloppy: true, indent: 4, maxerr: 50, evil: true, unused: false */
/*global Parse: true, console: true, exports: true */

//Bitly (formerly Bit.ly) is a URL shortening and bookmarking service owned by Bitly, Inc. (https://bitly.com/)
//
//
//Sign up for a Bitly account at
// https://bitly.com/a/sign_up
//
//
//There are two methods of authenticating with Bitly's API
//
//1- OAuth access token
//  which can be generated by visiting: https://bitly.com/a/oauth_apps
//
// OR
//
//2- LoginName and ApiKey (deprecated)
//  which can be generated by visiting: https://bitly.com/a/your_api_key/
//
// Original: https://parse.com/questions/bitlyjs-a-cloud-code-module-for-shortening-long-urls
// Revised to use Promise by SmallSharpTools in October, 2013 (http://sstools.co/)
// 
/**************************** EXAMPLE ********************************
    var reallyLongLink = "http://www.thisisareallylonglink.com/";
 
    var bitly = require('cloud/bitly.js'); //bitly.js must exist in your cloud directory
 
    var authToken = "YOUR_AUTH_TOKEN";
 
    bitly.initializeWithOAuthToken(authToken);
 
    //or you could have initialized with Login/ApiKey (deprecated)
    //var login = "YOUR_LOGIN";
    //var api_key = "YOUR_API_KEY";
    //bitly.initializeWithLoginAndApiKey(login, api_key);
 
    //call shortenUrl, and pass the url you'd like to shorten as 'longUrl'
    bitly.shortenUrl({ longUrl : longUrl }).then(handleSuccess, handleError);
***********************************************************************/
 
// recommended authentication with OAuth token
var _bitlyApiUrl = "https://api-ssl.bitly.com/v3/shorten?";
var _bitlyOAuthToken;
 
// deprecated authentication with Login/ApiKey
var _bitlyApiUrlDeprecated = "http://api.bitly.com/v3/shorten?";
var _bitlyLogin;
var _bitlyApiKey;
 
// initialize with OAuth token
exports.initializeWithOAuthToken = function(oAuthToken) {
    _bitlyOAuthToken = oAuthToken;
};
 
// initialize with login and apiKey
exports.initializeWithLoginAndApiKey = function(bitlyLogin, bitlyApiKey) {
    _bitlyLogin = bitlyLogin;
    _bitlyApiKey = bitlyApiKey;
};

// takes 'longUrl' and returns a shortUrl if successful
exports.shortenUrl = function(params) {
    var request = new Parse.Promise();
    if (_bitlyOAuthToken) {
        // recommended method of authenticating (with OAuth token)
        Parse.Cloud.httpRequest({
            url: _bitlyApiUrl + "access_token=" + _bitlyOAuthToken +
                    "&longUrl=" + encodeURIComponent(params.longUrl),
            success: function(httpResponse) {
                var jsonResponse = eval("(" + httpResponse.text + ')');
                var url = jsonResponse.data.url;
                if (url) {
                    request.resolve(url);
                } else {
                    request.reject(httpResponse.text);
                }
            },
            error: function(httpResponse) {
                request.reject(httpResponse.text);
            }
        });
    }
    else if (_bitlyLogin && _bitlyApiKey) {
        //deprecated method of authenticating
        Parse.Cloud.httpRequest({
            url: _bitlyApiUrlDeprecated + "login=" + _bitlyLogin +
                                            "&apiKey=" + _bitlyApiKey +
                                            "&longUrl=" + encodeURIComponent(params.longUrl) +
                                            "&format=" + "json",
            success: function(httpResponse) {
                var jsonResponse = eval("(" + httpResponse.text + ')');
                var url = jsonResponse.data.url;
                if (url) {
                    request.resolve(url);
                } else {
                    request.reject(httpResponse.text);
                }
            },
            error: function(httpResponse) {
                request.reject(httpResponse.text);
            }
        });
    }
    else {
        // case where neither initialization methods were called
        var error = "Error: You must call bitly.initializeWithOAuthToken(token) or bitly.initializeWithLoginAndApiKey(login, apiKey) before calling bitly.shortenUrl";
        request.reject(error);
    }
    return request;
};