/*
 * Helpers for various tasks
 *
 */

// Dependencies
const crypto = require('crypto');
const querystring = require('querystring');
const https = require('https');


// Container for library
var helpers = {};


// Create a SHA256 hash
helpers.hash = function(str) {
  if (typeof(str) == 'string' && str.length > 0) {
    var hash = crypto.createHmac('sha256', config.hashSecret)
            .update(str).digest('hex');
    return hash;
  } else {
    return false;
  }
};

// Parse JSON without throwing parsing exceptions
helpers.parseJsonToObject = function(str) {
  try {
    var obj = JSON.parse(str);
    return obj;
  } catch(e) {
    return {};
  }
}

// Create a random string with given length
helpers.createRandomString = function(strLength) {
  strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength : false;
  if (strLength) {
    // Define all the possible characters for the string
    var possibleCharacters = 'qwertyuiopasdfghjklzxcvbnm1234567890';

    var str = '';

    for (i = 0; i < strLength; i++) {
      // Get a random character from possible characters
      var randomCharacter = possibleCharacters.charAt(Math.floor(Math.random()
              * possibleCharacters.length));
      // Append given character
      str += randomCharacter;
    }

    return str;
  } else {
    return false;
  }
}

// Export the module
module.exports = helpers;
