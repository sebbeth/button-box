const config = require('../config.json');
const SmartLampController = require('../helpers/SmartLampController.js');
const FirebaseController = require("../helpers/FirebaseController.js");




const firebaseController = new FirebaseController(config);

// firebaseController.subscribeToTopic("red",cb);

firebaseController.writeToTopic("red",999);



function cb(value) {
    console.log(value);
    firebaseController.close();
}