
var microBit;
microBit = new uBit();
var accel_period;

//ACCELEROMETER DATA
var ax, ay, az, value,  pitch, roll;
var weight=0.5;
var filteredax = 0;
var filtereday = 0;
var filteredaz = 0;

//hitting parameters
var gateks = 0 ;
var gatesnare = 0 ;
var gatetoms = 0 ;
var onkick = 0;
var onsnare = 0;
var tomon = 0 ;

var treshk = 1 ;            // accel beat treshold set !!
var treshs = 1.04 ;

//
var Ts = 50;
var read_active=false;

//SLOPE EXTRAPOLATION VARIABLES
var varx=0;

var N=8; //window
var win; //windows superposition
var gate_trig=0; //hysteresis lenght

//linear regression data
var time=[]; //x axe array
var sum_N=0;
var sum_N2=0;

for (i = 0; i < N; i++) {
    time[i]=i+1;
    sum_N += time[i];
    sum_N2 += math.square(time[i]);
} 

var H=math.matrix([[N, sum_N], [sum_N,sum_N2]]);
var H_inv=math.inv(H);

datax=new Array(N);
var sumx=0;
var sumt=0;

var p=math.zeros(2,1);

//other util variables
var i;

//MicroBit BLE specific functions
function searchDevice() { 
    microBit.searchDevice(); 
}

microBit.onConnect(function() {
    console.log("connected");
    document.getElementById("connected").innerHTML="true"; 
});

microBit.onDisconnect(function(){
    console.log("disconnected");
    document.getElementById("connected").innerHTML="false";
    setTimeout(readAccPeriod,250);
    setTimeout(readAccPeriod,500);
});

microBit.onReadyDevice(function() {
    console.log("Ready");
    setTimeout(readAccPeriod,250);
    setTimeout(readAccPeriod,500);    
});

//updating data on bluetooth notification
microBit.onBleNotify( function(){
    
    ax = ((microBit.getAccelerometer().x ) / 1024);
    filteredax = ( ( 1-weight ) * filteredax + weight*ax ).toFixed(2);
    
    ay = ((microBit.getAccelerometer().y ) / 1024);
    filtereday = ( ( 1-weight ) * filtereday + weight*ay ).toFixed(2);
    
    az = ((microBit.getAccelerometer().z ) / 1024);
    filteredaz = (( ( 1-weight ) * filteredaz + weight*az )).toFixed(2);
    
    //t=microBit.getBearing();
    varx=getSlope(ax);
    
    gate_trig+=1;
    
    if (varx<=-4 && gate_trig>15){
        //console.log("reached");
        gate_trig=0;
        kicksound.play();
        //console.log(varx);
    }
})

function getSlope(sample){
    if (win < N/N+1){
        win += 1;
        datax.push(sample);
        datax.shift();
        return varx;
    }else{
        win=0;
        sumx=0;
        sumt=0;
    
        for (i = 0; i < N; i++) {
            sumx += datax[i];
            sumt += time[i]*datax[i];
        } 

        p.subset(math.index(0,0),sumx);
        p.subset(math.index(1,0),sumt);
        theta=math.multiply(H_inv,p);

        curr_varx=theta.subset(math.index(1,0));
        curr_varx=(curr_varx*10).toFixed(6);
        
        return curr_varx;
    }
};

function readAccPeriod(){
    //try-catch to deal with "standard" errors
    try {
        microBit.readAccelerometer_period();
        //internal microBit error catching to deal with "uncaught" DOMExpection errors
        var ops=microBit.error;
        if (!ops){
            accel_period=microBit.getAccelerometer_period();
            document.getElementById("acc-per").innerHTML=accel_period+" ms";
        }else{
            console.log("no");
            document.getElementById("acc-per").innerHTML="null";
        }
    }
    catch(err) {
        document.getElementById("acc-per").innerHTML="null";
    }
}

function setAccPeriod(){
    //this will set the accelerometer period sampling direct to 2 ms
    microBit.setAccelerometer_period(2);
    setTimeout(readAccPeriod,500);
}

function data(){
    setTimeout(read,10);
};

function read(){
    
//    period=microBit.getAccelerometer_period();
//    console.log(period);
    
    pitch = ((Math.atan2( -filtereday,-filteredaz ) ) * 180 / 3.14).toFixed(2);
    roll  = ((Math.atan2(filteredax, Math.sqrt( ( filtereday*filtereday ) + (filteredaz*filteredaz)))) * 180 / 3.14 ).toFixed(2);
    
    document.getElementById("roll").innerHTML=roll;
    document.getElementById("pitch").innerHTML=pitch;
    document.getElementById("ax").innerHTML=filteredax; 
    document.getElementById("ay").innerHTML=filtereday; 
    document.getElementById("az").innerHTML=filteredaz; 
    
//    document.getElementById("t").innerHTML=t;
    document.getElementById("varx").innerHTML=varx;
    
    tempo = Number(document.getElementById("bpm").value);
    
    {
//    switch ( gateks ) {
//        case 1 :     
//            if ( filteredaz > treshk )  
//            { onkick = 1;  
//             onsnare = 0 ;  
//            }
//            else if ( filteredax > treshs )  
//            { onsnare = 1; 
//             onkick = 0;
//            }
//            else { onsnare = 0; 
//                 onkick = 0;  }
//            break ;
//        case 0 :  
//            onkick = 0;
//            onsnare = 0 ; 
//            break ;
//    }
//    
//    switch ( gatetoms ) {
//        case 1 : 
//             if (roll < -30){ tomon = 1; }
//             else if (roll > 30) { tomon = 2; }
//             else { tomon = 0 ; }
//             break ;
//        case 0 : 
//            tomon = 0; 
//            break ;
//    }
//    
//    switch ( gatehats ) {
//        case 1 : 
//            if (filteredaz > 0.8 ) { 
//                switch (true) {
//                    case pitch<0 :
//                         haton = 1;
//                         //console.log('closed');
//                     break;
//                    case pitch >0 :
//                         //console.log('open');
//                         haton = 2 ;
//                    break;
//                }  
//            } 
//            else { haton = 0 }
//             break ;
//        case 0 : 
//            { haton = 0 ; }
//            break ;
//    }
//    
    }
    
    if(read_active){
        setTimeout(read,Ts);
    }
    
};
