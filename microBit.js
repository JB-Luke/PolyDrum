var ACCEL_SRV =     'e95d0753-251d-470a-a062-fa1922dfa9a8';
var ACCEL_DATA =    'e95dca4b-251d-470a-a062-fa1922dfa9a8';
var ACCEL_PERIOD =  'e95dfb24-251d-470a-a062-fa1922dfa9a8';
var MAGNETO_SRV =   'e95df2d8-251d-470a-a062-fa1922dfa9a8';
var MAGNETO_DATA = 'e95dfb11-251d-470a-a062-fa1922dfa9a8';
var MAGNETO_PERIOD = 'e95d386c-251d-470a-a062-fa1922dfa9a8';
var MAGNETO_BEARING = 'e95d9715-251d-470a-a062-fa1922dfa9a8';
var MAGNETO_CALIB = 'e95db358-251d-470a-a062-fa1922dfa9a8';
var BTN_SRV = 'e95d9882-251d-470a-a062-fa1922dfa9a8';
var BTN_A_STATE = 'e95dda90-251d-470a-a062-fa1922dfa9a8';
var BTN_B_STATE = 'e95dda91-251d-470a-a062-fa1922dfa9a8';
var IO_PIN_SRV = 'e95d127b-251d-470a-a062-fa1922dfa9a8';
var IO_PIN_DATA = 'e95d8d00-251d-470a-a062-fa1922dfa9a8';
var IO_AD_CONFIG = 'e95d5899-251d-470a-a062-fa1922dfa9a8';
var IO_PIN_CONFIG = 'e95db9fe-251d-470a-a062-fa1922dfa9a8';
var IO_PIN_PWM = 'e95dd822-251d-470a-a062-fa1922dfa9a8';
var LED_SRV = 'e95dd91d-251d-470a-a062-fa1922dfa9a8';
var LED_STATE = 'e95d7b77-251d-470a-a062-fa1922dfa9a8';
var LED_TEXT = 'e95d93ee-251d-470a-a062-fa1922dfa9a8';
var LED_SCROLL = 'e95d0d2d-251d-470a-a062-fa1922dfa9a8';
var TEMP_SRV = 'e95d6100-251d-470a-a062-fa1922dfa9a8';
var TEMP_DATA = 'e95d9250-251d-470a-a062-fa1922dfa9a8';
var TEMP_PERIOD = 'e95d1b25-251d-470a-a062-fa1922dfa9a8';

var srv_name;
var chr_name;

class uBit {

    constructor() {
        this.accelerometer = {
            x: 0,
            y: 0,
            z: 0  
        };

        this.magnetometer_raw = {
            x: 0,
            y: 0,
            z: 0
        };
      
        this.accelerometer_period=0;      
      
        this.magnetometer_bearing = 0;
        
        this.temperature = 0;

        this.buttonA = 0;
        this.buttonACallBack=function(){};

        this.buttonB = 0;
        this.buttonBCallBack=function(){};

        this.connected = false;

        this.onConnectCallback=function(){};
        this.onDisconnectCallback=function(){};
        
        this.onReadyDeviceCallback=function(){};

        this.onBLENotifyCallback=function(){};

        this.characteristic = {
            LED_STATE: {},
            LED_TEXT: {},
            LED_SCROLL: {},
            
            MAGNETO_PERIOD: {},
            MAGNETO_BEARING: {},
            MAGNETO_DATA: {},
            MAGNETO_CALIB: {},
            
            BTN_A_STATE: {},
            BTN_B_STATE: {},
            
            ACCEL_PERIOD: {},
            ACCEL_DATA: {},
            
            IO_PIN_DATA: {},
            IO_AD_CONFIG: {},
            IO_PIN_CONFIG: {},
            IO_PIN_PWM: {},
            
            TEMP_DATA: {},
            TEMP_PERIOD: {},
        }
        this.error=false;
  }
    
    readAccelerometer_period(){
        this.characteristic.ACCEL_PERIOD.readValue()
        .then(_ => {
            this.error=false;
            })
        .catch(error => {
//            console.log(error);
            this.error=true;
        });
        this.accelerometer_period=this.characteristic.ACCEL_PERIOD.value.getUint16(0, true);
    }
    
    getAccelerometer_period(){
        return this.accelerometer_period;
    }
    
    
    setAccelerometer_period(t){
        var buffer= new Uint16Array(1);
        buffer[0]=t;
        if(this.connected){
            this.characteristic.ACCEL_PERIOD.writeValue(buffer)
            .then(_ => {
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
    
    getTemperature() {
        return this.temperature;
    }
    
    getAccelerometer() {
        return this.accelerometer;
    }

    getBearing() {
        return this.magnetometer_bearing;
    }

    getButtonA() {
        return this.buttonA;
    }

    setButtonACallback(callbackFunction){
        this.buttonACallBack=callbackFunction;
    }

    getButtonB() {
        return this.buttonB;
    }

    setButtonBCallback(callbackFunction){
        this.buttonBCallBack=callbackFunction;
    }

    onConnect(callbackFunction){
        this.onConnectCallback=callbackFunction;
    }

    onDisconnect(callbackFunction){
        this.onDisconnectCallback=callbackFunction;
    }
    
    onReadyDevice(callbackFunction){
        this.onReadyDeviceCallback=callbackFunction;
    }

    onBleNotify(callbackFunction){
        this.onBLENotifyCallback=callbackFunction;
    }

    writePin(pin) {
        //something like this should work, but we need to create the correct buffer
        //this.characteristic.IO_PIN_DATA.writeValue(data);
    }

    readPin(pin) {

    }
    
    readAPeriod() {
        return this.accelerometer_period;
    }

    writeMatrixIcon(icon) {
        var ledMatrix = new Int8Array(5);
        var buffer = [
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', '0'],
            ['0', '0', '0', '0', '0', '0', '0', '0']
        ]
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 5; j++) {
                buffer[i][7-j] = icon[i][4 - j]
            }
        }
        for (var i = 0; i < 5; i++) {
            var string = buffer[i].join("");
            ledMatrix[i]=parseInt(string,2)
        }
        if(this.connected){
            this.characteristic.LED_STATE.writeValue(ledMatrix)
            .then(_ => {
            })
            .catch(error => {
            console.log(error);
            });
        }
    }

    writeMatrixTextSpeed(speed){
        var buffer= new Uint8Array(speed);
        if(this.connected){
            this.characteristic.LED_TEXT.writeValue(buffer)
            .then(_ => {
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    writeMatrixText(str){
        var buffer= new Uint8Array(toUTF8Array(str));
        if(this.connected){
            this.characteristic.LED_TEXT.writeValue(buffer)
            .then(_ => {
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    onButtonA(){
        this.buttonACallBack();
    }

    onButtonB(){
        this.buttonBCallBack();
    }
    
  characteristic_updated(event) {
      
    this.onBLENotifyCallback();
      
    //BUTTON CHARACTERISTIC
    if (event.target.uuid == BTN_A_STATE) {
      //console.log("BTN_A_STATE", event.target.value.getInt8());
      this.buttonA = event.target.value.getInt8();
      if (this.buttonA){
        this.onButtonA();
      }
    }

    if (event.target.uuid == BTN_B_STATE) {
      //console.log("BTN_B_STATE", event.target.value.getInt8());
      this.buttonB = event.target.value.getInt8();
      if (this.buttonB){
        this.onButtonB();
      }
    }

    //ACCELEROMETER CHARACTERISTIC
    if (event.target.uuid == ACCEL_DATA) {
      //true is for reading the bits as little-endian
      //console.log("ACCEL_DATA_X", event.target.value.getInt16(0,true));
      //console.log("ACCEL_DATA_Y", event.target.value.getInt16(2,true));
      //console.log("ACCEL_DATA_Z", event.target.value.getInt16(4,true));
      this.accelerometer.x = event.target.value.getInt16(0, true);
      this.accelerometer.y = event.target.value.getInt16(2, true);
      this.accelerometer.z = event.target.value.getInt16(4, true);
    }

    // MAGNETOMETER CHARACTERISTIC (raw data)
    if (event.target.uuid == MAGNETO_DATA) {
      //  console.log("MAGNETO_DATA_X", event.target.value.getInt16(0,true));
      //  console.log("MAGNETO_DATA_Y", event.target.value.getInt16(2,true));
      //  console.log("MAGNETO_DATA_Z", event.target.value.getInt16(4,true));
      this.magnetometer_raw.x = event.target.value.getInt16(0, true);
      this.magnetometer_raw.y = event.target.value.getInt16(2, true);
      this.magnetometer_raw.z = event.target.value.getInt16(4, true);
    }

    // MAGNETOMETER CHARACTERISTIC (bearing)
    if (event.target.uuid == MAGNETO_BEARING) {
      //console.log("BEARING", event.target.value.getInt16(0,true));
      this.magnetometer_bearing = event.target.value.getInt16(0, true);
    }

    // TEMPERATURE CHARACTERISTIC
    if (event.target.uuid == TEMP_DATA) {
      //console.log("TEMP_DATA", event.target.value.getInt8());
      this.temperature = event.target.value.getInt8();

    }
  }

    searchDevice() {
        filters: []
        var options = {};
        options.acceptAllDevices = true;
        //options.optionalServices = [ACCEL_SRV, MAGNETO_SRV, BTN_SRV, IO_PIN_SRV, LED_SRV, TEMP_SRV];
        options.optionalServices = [ACCEL_SRV, BTN_SRV, LED_SRV];

        console.log('Requesting Bluetooth Device...');
        console.log('with ' + JSON.stringify(options));

        navigator.bluetooth.requestDevice(options)
        .then(device => {

            console.log('> Name:             ' + device.name);
            console.log('> Id:               ' + device.id);

            device.addEventListener('gattserverdisconnected', this.onDisconnectCallback);

            // Attempts to connect to remote GATT Server.
            return device.gatt.connect();

        })
        .then(server => {
        // Note that we could also get all services that match a specific UUID by
        // passing it to getPrimaryServices().
            this.onConnectCallback();
            console.log('Getting Services...');
            return server.getPrimaryServices();
        })
        .then(services => {
            console.log('Getting Characteristics...');
            let queue = Promise.resolve();
            services.forEach(service => {
                queue = queue.then(_ => service.getCharacteristics().then(characteristics => {
                    
                    switch (service.uuid) {
                        case ACCEL_SRV:
                            srv_name="Accelerometer";
                            break;
                            
                        case MAGNETO_SRV:
                            srv_name="Magnetometer";
                            break;
                            
                        case BTN_SRV:
                            srv_name="Buttons";
                            break;
                            
                        case IO_PIN_SRV:
                            srv_name="IO Pin";
                            break;
                        
                        case LED_SRV:
                            srv_name="LED";
                            break;
                            
                        case TEMP_SRV:
                            srv_name="Temperature";
                            break;
                            
                        default:
                    }
                    console.log('> '+srv_name+' Service:     ' + service.uuid);
                    characteristics.forEach(characteristic => {
                        //need to store all the characteristic I want to write to be able to access them later.
                        switch (characteristic.uuid) {
                             case LED_STATE:
                                this.characteristic.LED_STATE = characteristic;
                                this.connected = true;
                                chr_name="LCD State";
                            break;

                            case LED_TEXT:
                                this.characteristic.LED_TEXT = characteristic;
                                chr_name="LED Text";
                            break;
                                
                            case LED_SCROLL:
                                this.characteristic.LED_SCROLL = characteristic;
                                chr_name="LED Scroll Speed";
                            break;
                            
                            case MAGNETO_DATA:
                                this.characteristic.MAGNETO_DATA = characteristic;
                                chr_name="Magnetometer Data";
                            break;
                                
                            case MAGNETO_CALIB:
                                this.characteristic.MAGNETO_CALIB = characteristic;
                                chr_name="Magnetometer Calibration";
                            break;
                                
                            case MAGNETO_BEARING:
                                this.characteristic.MAGNETO_BEARING = characteristic;
                                chr_name="Magnetometer Bearing";
                            break;   
                                
                            case MAGNETO_PERIOD:
                                this.characteristic.MAGNETO_PERIOD = characteristic;
                                chr_name="Magnetometer Period";
                            break;
                            
                            case BTN_A_STATE:
                                this.characteristic.BTN_A_STATE = characteristic;
                                chr_name="Button A State";
                            break;
                                
                            case BTN_B_STATE:
                                this.characteristic.BTN_B_STATE = characteristic;
                                chr_name="Button B State";
                            break;
                                
                            case IO_PIN_DATA:
                                this.characteristic.IO_PIN_DATA = characteristic;
                                chr_name="IO PIN DATA";
                            break;

                            case IO_AD_CONFIG:
                                this.characteristic.IO_AD_CONFIG = characteristic;
                                chr_name="IO AD CONFIG";
                            break;

                            case IO_PIN_CONFIG:
                                this.characteristic.IO_PIN_CONFIG = characteristic;
                                chr_name="IO PIN CONFIG";
                            break;

                            case IO_PIN_PWM:
                                this.characteristic.IO_PIN_PWM = characteristic;
                                chr_name="IO PIN PWM";
                            break;
                                    
                            case ACCEL_PERIOD:
                                this.characteristic.ACCEL_PERIOD = characteristic;
                                chr_name="Accelerometer Period";
                                //console.log(this.characteristic.ACCEL_PERIOD);
                            break;  

                            case ACCEL_DATA:
                                this.characteristic.ACCEL_DATA = characteristic;
                                chr_name="Accelerometer Data";
                            break;  
                            
                            case TEMP_DATA:
                                this.characteristic.TEMP_DATA = characteristic;
                                chr_name="Temperature Data";
                            break;
                                
                            case TEMP_PERIOD:
                                this.characteristic.TEMP_PERIOD = characteristic;
                                //console.log(this.characteristic.TEMP_PERIOD);
                                chr_name="Temperature Period";
                            break;
                                
                            default:

                        }
                        console.log('    >> '+chr_name+' Characteristic: ' + characteristic.uuid + ' ' + getSupportedProperties(characteristic));
                        
                        if (getSupportedProperties(characteristic).includes('NOTIFY')) {
                            characteristic.startNotifications().catch(err => console.log('startNotifications', err));
                            characteristic.addEventListener('characteristicvaluechanged', this.characteristic_updated.bind(this));
                        }
                    });
                }));
            });
            return queue;
        })
        .then(_ => {this.onReadyDeviceCallback();})
        .catch(error => {
            console.log('Argh! ' + error);
        });
    }
}


/* Utils */

function isWebBluetoothEnabled() {
    if (navigator.bluetooth) {
        return true;
    } else {
        ChromeSamples.setStatus('Web Bluetooth API is not available.\n' +
            'Please make sure the "Experimental Web Platform features" flag is enabled.');
        return false;
    }
}

function getSupportedProperties(characteristic) {
    let supportedProperties = [];
    for (const p in characteristic.properties) {
        if (characteristic.properties[p] === true) {
            supportedProperties.push(p.toUpperCase());
        }
    }
    return '[' + supportedProperties.join(', ') + ']';
}

function toUTF8Array(str) {
    var utf8 = [];
    for (var i=0; i < str.length; i++) {
        var charcode = str.charCodeAt(i);
        if (charcode < 0x80) utf8.push(charcode);
        else if (charcode < 0x800) {
            utf8.push(0xc0 | (charcode >> 6),
                      0x80 | (charcode & 0x3f));
        }
        else if (charcode < 0xd800 || charcode >= 0xe000) {
            utf8.push(0xe0 | (charcode >> 12),
                      0x80 | ((charcode>>6) & 0x3f),
                      0x80 | (charcode & 0x3f));
        }
        // surrogate pair
        else {
            i++;
            // UTF-16 encodes 0x10000-0x10FFFF by
            // subtracting 0x10000 and splitting the
            // 20 bits of 0x0-0xFFFFF into two halves
            charcode = 0x10000 + (((charcode & 0x3ff)<<10)
                      | (str.charCodeAt(i) & 0x3ff));
            utf8.push(0xf0 | (charcode >>18),
                      0x80 | ((charcode>>12) & 0x3f),
                      0x80 | ((charcode>>6) & 0x3f),
                      0x80 | (charcode & 0x3f));
        }
    }
    return utf8;
}
