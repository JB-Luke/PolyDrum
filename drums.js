var stop=false;

var activeClick=false;
var volumeClick;

var volume=[];

var mainpause;
var pause=[];

//var polycycle;
//var polyindex;

var names=["bassDrum","snareDrum","cHiHat","oHiHat","Tom","fTom"];

var part=[];

var sound=[];

sound[0] = new Howl({ src: ['sounds/kick.wav'] });
sound[1] = new Howl({ src: ['sounds/snare.wav'] });
sound[2] = new Howl({ src: ['sounds/closedhat.wav'] });
sound[3] = new Howl({ src: ['sounds/openedhat.wav'] });
sound[4] = new Howl({ src: ['sounds/tom1.wav'] });
sound[5] = new Howl({ src: ['sounds/tom2.wav'] });

sound[10] = new Howl({ src: ['sounds/click.wav'] });

function kitpart(name, reference, array, index, timebin, sound) {
    this.partName   = name;
    this.reference  = reference;
    this.array      = {};
    this.index      = index;
    this.time       = timebin;
    this.sound      = sound;
}

function channelGen(){    
    for (var i=0; i<6; i++){
        part[i+1] = new kitpart(names[i],i+1,new Array(),0,timeBins[i+1],sound[i]);
    }
}

function updateTimes(){
    for (var i = 0; i < 6; i++){
        part[i+1].time  = timeBins[i+1];
    }
}

function resetArray(reference){
    if (reference==0){
        for (var i = 0; i < 6; i++){
            part[i+1].array = new Array(size[i+1]);
        }
    }else{
        part[reference].array = new Array(size[reference]);
    }
}

function playloop(part,click) {
    // related to array bins
    if ( part.array[part.index]==true ){
        putActive(part.index,part.reference);
        part.sound.volume(volume[part.reference]);
        part.sound.play();
    }else{
        putActive(part.index,part.reference);
    }
    // related to click
    if (click && activeClick){
        if (!(part.index % (size[part.reference]/beat[part.reference]))){
            sound[10].volume(volumeClick);
            sound[10].play();
        }
    }

    if (part.index < part.array.length-1){
        part.index += 1;
        pause[part.reference] = setTimeout(function(){playloop(part,click);},part.time);
    }else{
        part.index = 0;
    }
};


function mainPlay(){
    
    running=true;
    
    for (i=1; i<7; i++){
        if (i==bpmChecked){
            playloop(part[i],true);
        }else{
            playloop(part[i],false);
        }
    }
    mainpause = setTimeout(mainPlay,barTime);
}

function mainStop(){
    running=false;
    for (var i=1; i<7; i++){
        clearTimeout(pause[i]);
        part[i].index=0;
    }
    clearTimeout(mainpause);
}

//function lcm( First_number,  Second_number) {
//    var x,max,min,lcm;
//    if(First_number>Second_number){
//        max=First_number;
//        min=Second_number;
//    }
//    else
//    {
//        max=Second_number;
//        min=First_number;
//    }
//    for(var i = 1; i <= min; i++){
//        x = max * i; 
//        if(x%min==0) {
//            lcm = x; 
//            break; 
//        }
//    }
//    return lcm;
//}
//
//function polyreset(){
//    if (flag[2]===1){
//        polycycle=lcm(size[1],size[2]);
//        polycycle=polycycle/size[2];
//        polyindex=1;
//    }else{
//        polyindex=0;
//    }
//}
//
//var syn2,syn3;
//var count2,count3;


//function polyrhthm_count(){   not in use
//    
//    
//    if(Math.abs(dur1-dur2)>200){
//        syn2 = lcm(dur1,dur2);
//        count2 = syn2/dur2; }
//    else { count2 = 1 ;}
//    
//    if(Math.abs(dur1-dur3)>200){
//        syn3 = lcm(dur1,dur3);
//        count3 = syn3/dur3; }
//    else { count3 = 1 ;}
//    
//    
//    document.getElementById("turn2").innerHTML = count2;  
//    document.getElementById("turn3").innerHTML = count3; 
//    return;
//    
//}


