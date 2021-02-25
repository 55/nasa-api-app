import { Template } from "meteor/templating";
import { Meteor } from "meteor/meteor";

Template.main.onCreated(function () {
  const instance = this;

  instance.closestToEarthAsteroid = new ReactiveVar();

  // Get data from the API call
  instance.autorun(() => {
    Meteor.call("getNasaNeoFeed", (error, result) => {
      if (error) {
        console.error(error);
      } else {
        let observationDates = result.near_earth_objects;
        let observationDatesValues = Object.values(observationDates);

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

        if (shortestDistance()) {
          for (const value of observationDatesValues) {
            let asteroid = value.find(
              (a) =>
                a.close_approach_data[0].miss_distance.kilometers ==
                shortestDistance()
            );

            if (asteroid) {
              console.log(asteroid);
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
});
