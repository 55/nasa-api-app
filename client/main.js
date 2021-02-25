// Imports
import { Template } from "meteor/templating";
import { Meteor } from "meteor/meteor";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";

// Config for the spinner
Meteor.Spinner.options = {
  color: "#fff",
  shadow: false,
};

Template.main.onCreated(function () {
  const instance = this;

  // Reactive variable to store information about asteroid
  instance.closestToEarthAsteroid = new ReactiveVar();

  // Get data from the API call
  instance.autorun(() => {
    Meteor.call("getNasaNeoFeed", (error, result) => {
      if (error) {
        console.error(error);
      } else {
        let observationDates = result.near_earth_objects;
        let observationDatesValues = Object.values(observationDates);

        // Find the value of the shortest distance to Earth
        const shortestDistance = () => {
          let distanceNumbersArray = [];
          for (const values of Object.values(observationDates)) {
            values.forEach(function (entry) {
              let distanceNumbers = Number(
                entry.close_approach_data[0].miss_distance.kilometers
              );
              distanceNumbersArray.push(distanceNumbers);
            });
          }
          return Math.min(...distanceNumbersArray);
        };

        // Find the asteroid using the shortest distance value
        if (shortestDistance()) {
          for (const value of observationDatesValues) {
            let asteroid = value.find(
              (a) =>
                a.close_approach_data[0].miss_distance.kilometers ==
                shortestDistance()
            );

            if (asteroid) {
              // Save information about asteroid to our reactive variable
              instance.closestToEarthAsteroid.set(asteroid);
            }
          }
        }
      }
    });
  });
});

Template.main.helpers({
  closestToEarthAsteroid() {
    return Template.instance().closestToEarthAsteroid.get();
  },
  isPotentiallyHazardous() {
    const closestToEarthAsteroid = Template.instance().closestToEarthAsteroid.get();

    return closestToEarthAsteroid.is_potentially_hazardous_asteroid
      ? "was"
      : "wasn't";
  },
});
