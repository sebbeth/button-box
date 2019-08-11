const Gpio = require('pigpio').Gpio;
const Led = require('../helpers/Led.js');
const config = require('../config.json');
const https = require("https");

const ledR = new Led(config.pins.ledR);
const buttonR = new Gpio(config.pins.buttonR, {
    mode: Gpio.INPUT,
    pullUpDown: Gpio.PUD_DOWN,
    edge: Gpio.EITHER_EDGE
  });
const ledW = new Led(config.pins.ledW);
const buttonW = new Gpio(config.pins.buttonW, {
    mode: Gpio.INPUT,
    pullUpDown: Gpio.PUD_DOWN,
    edge: Gpio.EITHER_EDGE
  });


  buttonW.on('interrupt', (level) => {
  if(level === 1) {
      if (lampState === 0) {
          led.pulse();
      }
      sendSms("wbutton");
  }
});


function sendSms(buttonId) {
  ledW.pulse();
  const url = "https://maker.ifttt.com/trigger/"+buttonId+"/with/key/" + key;
  https.post(url,null,() => {
    ledW.off();
  });
}
