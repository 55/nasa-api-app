import { Template } from "meteor/templating";
import { Meteor } from "meteor/meteor";

Template.main.onCreated(function () {
  const instance = this;

  instance.nasaApiData = new ReactiveVar();

  // Get data from the API call
  instance.autorun(() => {
    Meteor.call("getNasaNeoFeed", (error, result) => {
      if (error) {
        console.error(error);
      } else {
        console.log(result);
      }
    });
  });
});