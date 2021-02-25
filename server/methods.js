// Imports
import { Meteor } from "meteor/meteor";
import { HTTP } from "meteor/jkuester:http";

// Get API key from settings.json
apiKey = Meteor.settings.apiKey;

Meteor.methods({
  getNasaNeoFeed() {
    // Construct the API URL
    const apiUrl =
      "https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-12-19&end_date=2015-12-26&api_key=" +
      apiKey;

    // Query the API
    let apiCall = function (apiUrl, callback) {
      try {
        let response = HTTP.get(apiUrl).data;
        callback(null, response);
      } catch (error) {
        const myError = new Meteor.Error(error);
        callback(myError, null);
      }
    };
    let response = Meteor.wrapAsync(apiCall)(apiUrl);
    return response;
  },
});
