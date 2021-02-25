## NASA API - Asteroids | NeoWs Neo - Feed

Example application utilizing [NASA API](https://api.nasa.gov/) and implemented using [Meteor](https://www.meteor.com/).
It finds an asteroid that passed the closest to Earth between 19th December 2015 and 26th December 2015 and shows its characteristics.

### Preview

![Application preview](https://i.imgur.com/eoB4c1O.png)

### Run this application locally
1. Install [Meteor](https://www.meteor.com/developers/install)
2. Get API key from [NASA API website](https://api.nasa.gov/)
3. Clone this repo
4. Create *settings.json* file with the content below in the root directory of the application
```
{
    "apiKey": "your NASA API KEY"
}
```
5. Install required packages by running `meteor npm install`
6. Start the application by running `meteor --settings settings.json`
