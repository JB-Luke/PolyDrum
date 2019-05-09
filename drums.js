var stop=false;

var activeClick=false;
var volumeClick;

var volume=[];

var mainpause;
var pause=[];

var click_beats;
var click_time;
var click_index=0;

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

function kitpart(name, reference, array, index, timebin, sound, armed) {
    this.partName   = name;
    this.reference  = reference;
    this.array      = {};
    this.index      = index;
    this.time       = timebin;
    this.sound      = sound;
    this.armed      = armed;
}

function channelGen(){    
    for (var i=0; i<6; i++){
        part[i+1] = new kitpart(names[i],i+1,new Array(),0,timeBins[i+1],sound[i],false);
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
            part[i+1].array = new Array(size[i+1]).fill(0);
        }
    }else{
        part[reference].array = new Array(size[reference]).fill(0);
    }
}

function playloop(part,click) {
    
    if (part.index < part.array.length-2){
        part.index += 1;
        pause[part.reference] = setTimeout(function(){playloop(part,click);},part.time);
    }else{
        part.index += 1;
    }
    
    // related to array bins
    if ( part.array[part.index]==true ){
        putActive(part.index,part.reference);
        part.sound.volume(volume[part.reference]);
        part.sound.play();
    }else{
        putActive(part.index,part.reference);
    }
    // related to click
//    if (click && activeClick){
//        if (!(part.index % (size[part.reference]/beat[part.reference]))){
//            sound[10].volume(volumeClick);
//            sound[10].play();
//        }
//    }
};
function renew_click(){
    if ($("#click-A").prop("checked")){
        click_beats=getBeatNum("x");
    }else{
        click_beats=getBeatNum("y");
    }
    click_time=barTime/click_beats;
}

function playclick() {
    
    if (click_index < click_beats-1){
        click_index += 1;
        click_pause = setTimeout(playclick,click_time);
    }
    if (activeClick){
        sound[10].volume(volumeClick);
        sound[10].play();
    }
}


function mainPlay(){
    
    running=true;
    
    for (i=1; i<7; i++){
        click_index=0;
        part[i].index=-1;
        playloop(part[i]);
    }
    playclick();
    mainpause = setTimeout(mainPlay,barTime);
}

function mainStop(){
    running=false;
    for (var i=1; i<7; i++){
        clearTimeout(pause[i]);
        part[i].index=0;
    }
    click_index=0;
    clearTimeout(click_pause);
    clearTimeout(mainpause);
}


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


