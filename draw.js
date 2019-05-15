var running = false;

//var flag =[];

var beatBins=[];
var beat=[];
var size=[];
var tatum;
var subd1, subd2;

var bpm;
var bpmChecked; //bpm checked loop reference
var barTime; //timebase of a single measure
var timeBins=[];

function reset(matrix) {
    resetArray(matrix);
    armRemover(matrix);
}

function putActive(n,matrix) {
    var active = document.getElementById("pattern-"+matrix);
    $(active.rows[0].cells[n]).effect("fade",150);
}

function refreshGraphics(matrix){
    if (matrix==0){
        for (var i=1; i<7; i++){
            var table = document.getElementById("pattern-"+i);
            for (var j=0; j<size[matrix]; j++){
                if (part[i].array[j]==1){
                    var isArmed = $(table.rows[0].cells[j]).hasClass("armed");
                    if (!isArmed){
                        $(table.rows[0].cells[j]).removeClass("notArmed");
                        $(table.rows[0].cells[j]).addClass("armed");
                    }
                }else{
                    var isArmed = $(table.rows[0].cells[j]).hasClass("armed");
                    if (isArmed){
                        $(table.rows[0].cells[j]).removeClass("armed");
                        $(table.rows[0].cells[j]).addClass("notArmed");
                    }
                }
            }
        }
    }else{
        var table = document.getElementById("pattern-"+matrix);
            for (var j=0; j<size[matrix]; j++){
                if (part[matrix].array[j]==1){
                    var isArmed = $(table.rows[0].cells[j]).hasClass("armed");
                    if (!isArmed){
                        $(table.rows[0].cells[j]).removeClass("notArmed");
                        $(table.rows[0].cells[j]).addClass("armed");
                    }
                }else{
                    var isArmed = $(table.rows[0].cells[j]).hasClass("armed");
                    if (isArmed){
                        $(table.rows[0].cells[j]).removeClass("armed");
                        $(table.rows[0].cells[j]).addClass("notArmed");
                    }
                }
            }
    }
}

function highlightActive(n,matrix) {
    var table=getMatId(matrix);
    var active = document.getElementById(table);
    $(active.rows[0].cells[n]).effect("fade",150);
    $(active.rows[1].cells[n]).effect("fade",150);
//    $(active.rows[0].cells[n]).hide();
//    $(active.rows[0].cells[n]).show("highlight");
//    active.rows[0].cells[n].classList.add("active");
//    active.rows[1].cells[n].classList.add("active");
}

function removeHighlight(matrix) {
//    var table=getMatId(matrix);
//    var deactive = document.getElementById(table);
//    for (i = 0; i < deactive.rows[0].cells.length; i++) {
//            deactive.rows[0].cells[i].classList.remove("active");
//            deactive.rows[1].cells[i].classList.remove("active");
//        }
}

function armRemover(matrix) {
    if (matrix==0){
        for (var k=1; k<7; k++){
            var table=document.getElementById("pattern-"+k);
            for (var i = 0; i < table.rows[0].cells.length; i++) {
                table.rows[0].cells[i].classList.remove("armed");
                table.rows[0].cells[i].classList.add("notArmed");
            }
        }
    }else{
        var table=document.getElementById("pattern-"+matrix);
        for (var j = 0; j < table.rows[0].cells.length; j++) {
            table.rows[0].cells[j].classList.remove("armed");
            table.rows[0].cells[j].classList.add("notArmed");
        }
    }
}

function TSchange(matrix){ 
    
    //get beats number for each measure
    if ($("#ass-A"+matrix).prop('checked')){
        beat[matrix] = getBeatNum("x");
    }else{
        beat[matrix] = getBeatNum("y");
    }
    
    //get bins number for each beat of the measure
    tatum=lcm(getBeatNum("x"),getBeatNum("y"));
    if  (tatum<=7){
         beatBins[matrix] = beat[matrix];
    }else{
        beatBins[matrix] = tatum/beat[matrix];
    }
    
    //get the complete number of bins of the measure
    size[matrix] = beat[matrix]*beatBins[matrix];
    
    //generate the matrix
    tableGen(matrix);
    
}

function getBeatNum(signature){
    
    var datats = $( "#TS-"+signature).val();
    var beats;
    
     switch(datats) {
        case "0":
            flag = 0 ;
            beats = 4;
        break;
        case "1":
            flag = 0 ;
            beats = 5;
        break;
        case "2":
            flag = 0 ;
            beats = 3;
        break;
        case "3":
            flag = 0 ;
            beats = 7;
        break;
        case "4":
            flag = 1 ;
            beats = 7;
        break;
        case "5":
            flag = 1 ;
            beats = 6;
        break;
        default:
    }
    return beats;
}

function getBinsNum(matrix){
    var minnote = $( "#min-bin-"+matrix).val();
    var bins;
    switch(minnote) {
        case "0":
            bins=8;
        break;
        case "1":
            bins=4;
        break;
        case "2":
            bins=2;
        break;
        case "3":
            bins=1;
        break;
    }
    return bins;
}

function tableGen(matrix) {
    var table=[];
    table=document.getElementById("pattern-"+matrix);
    
    var i = 0
    var tableid = table.id;
    
    if (table.rows.length != 0){
        table.deleteRow(0); 
    }
    var row = table.insertRow(0);
//    row.classList.add("tableRow");      //not used? what's that
        
    for (var k = 0; k < size[matrix]; k++) {
        var cell = row.insertCell(k);
        cell.classList.add("cell", "subbeat", "notArmed","ui-corner-all"); //cell css class not used
        cell.id="m"+matrix+"c"+k;
        mouseProp(cell);
//        armByClick2(tableid,i,cell);
        
        ClickArming(cell,matrix,k);
        
        if (k % (size[matrix]/beat[matrix]) === 0) {
            cell.classList.remove("subbeat");
            cell.classList.add("Beat", "notArmed");
        }
    }
}

function mouseProp(cell){
    $(cell).mouseenter(function(){
        $(this).addClass("hover");
    });
    $(cell).mouseleave(function(){
        $(this).removeClass("hover");
    }); 
    
}

function ClickArming(cell,matrix,index) {
    
    cell.addEventListener("click", function(){ 
        var isArmed = this.classList.contains("armed");
        if (!isArmed) {
            this.classList.remove("notArmed");
            this.classList.add("armed");
            part[matrix].array[index]=1;
        }else{
            this.classList.remove("armed");
            this.classList.add("notArmed");
            part[matrix].array[index]=0;
        }
    });
} 

function tatumGen(){
    $( ".min-bins" ).text(" ");
    if (tatum<=7){
        $( ".min-bins" ).append("(1/"+Math.pow(tatum, 2)+")");
    }else{
        $( ".min-bins" ).append("tatum (1/"+tatum+")");
    }
}

function setTimebase(beats) { 
    var bpm = $( "#slider1" ).slider( "value" );
    barTime = (60000 / bpm )* beats;
} 

function setTime(matrix) {
    if (matrix==0){
        //renew all the bins time segments
        for (var i = 1; i < 7 ; i++){
//            timeBins[i]=math.round(barTime/size[i]);
            timeBins[i]=barTime/size[i];
        }
    }else{
        //compute just the bins time segment of a single matrix
//        timeBins[matrix]=math.round(barTime/size[matrix]);
        timeBins[matrix]=barTime/size[matrix];
    }
    //polyrhthm_count();  //not in use, for the polymetering stuff
}

function rollTSchange(){
    for ( i = 1; i < 7; i ++) {
        TSchange(i);
    }
}

$(document).ready(function(){
        
    //generate sound class properties of the channels (see drums.js)
    channelGen();
    
    
    rollTSchange();    
    
    //generate timebase referring to the initial click assignment (time signature A)
    setTimebase(getBeatNum("x"));
    setTime(0);
    
    //set the array length of all the arrays
    resetArray(0);
    updateTimes();
    renew_click();
    
    tatumGen();
    
    for ( i = 1; i < 7; i ++) {
        
        $("#shiftl-"+i).on( "click", function(event) { 
            var bin=part[$(this).val()].array.shift();
            part[$(this).val()].array.push(bin);
            refreshGraphics($(this).val()); 
        });
        
        $("#shiftr-"+i).on( "click", function(event) { 
            var bin=part[$(this).val()].array.pop();
            part[$(this).val()].array.unshift(bin);
            refreshGraphics($(this).val());
        });
        
        $("#resetButton-"+i).on( "click", function(event) { reset($(this).val()); });
        
//        $( "#sig-"+i).on( "selectmenuchange", function( event, ui ) {
//            var index = $(this).data("index");
//            TSchange(index);
//            if ($("#bpm-ass-"+index).prop("checked")){ 
//                setTimebase(beat[index]);
//                setTime(0); 
//                
//            }else{
//                setTime(index);
//            }
//            //array edits
//            reset(index);
//            updateTimes();
//            if (running){ mainStop(); mainPlay(); }
//        });
        
        $("#min-bin-"+i).click(function(){
            
        });
        
        $("#sel-bins-"+i).click(function(){
            console.log($(this).val());
            for(o = 0; o < size[$(this).val()]; o++){
                if(!(o % (size[$(this).val()]/beat[$(this).val()]))){
                    part[$(this).val()].array[o]=1;
                }
            }
            refreshGraphics($(this).val());
        });
        
//        if (!(part.index % (size[part.reference]/beat[part.reference]))){
//            sound[10].volume(volumeClick);
//            sound[10].play();
//        }
        
        $("input[name='ctrl-"+i+"']").change(function(){
            TSchange($(this).val());
            refreshGraphics($(this).val());
            if (running){ mainStop(); mainPlay(); }
        });
        
        //on minimum note menu changes
        $( "#min-bin-"+i).data("index",i);
        $( "#min-bin-"+i).on( "selectmenuchange", function( event, ui ) {
            var index = $(this).data("index");
            TSchange(index);
            setTime(index);
            reset(index);
            updateTimes();
            if (running){ mainStop(); mainPlay(); }
        });
    };
    
    
//    $( "input[type='radio']" ).change(function() { 
//        for ( i = 1; i < 7; i ++) {
//            if ($("#click-A").prop("checked")){
//                 //renew bar time and bins time of each table
//                setTimebase(getBeatNum("x"));
//            }else{
//                setTimebase(getBeatNum("y"));
//            }
//        }
//        rollTSchange();
//        setTime(0);
//        updateTimes(); 
//        if (running){ mainStop(); mainPlay(); }
//    });
    
    //on Time Signature menu changes
    $( "#TS-x").on( "selectmenuchange", function( event, ui ) {
        rollTSchange();
        setTimebase(getBeatNum("x"));
        setTime(0);
        //array edits
        reset(0);
        updateTimes();
        renew_click();
        tatumGen();
        if (running){ mainStop(); mainPlay(); }
    });
    
    $( "#TS-y").on( "selectmenuchange", function( event, ui ) {
        rollTSchange();
        setTimebase(getBeatNum("y"));
        setTime(0);
        //array edits
        reset(0);
        updateTimes();
        renew_click();
        tatumGen();
        if (running){ mainStop(); mainPlay(); }
    });
    
    //on radio buttons changes
    $("input[name='proj-1']").change(function(){
        renew_click();
        if (running){ mainStop(); mainPlay(); }
    });
        
});

//Utilities
function lcm( First_number,  Second_number) {
    var x,max,min,lcm;
    if(First_number>Second_number){
        max=First_number;
        min=Second_number;
    }
    else
    {
        max=Second_number;
        min=First_number;
    }
    for(var i = 1; i <= min; i++){
        x = max * i; 
        if(x%min==0) {
            lcm = x; 
            break; 
        }
    }
    return lcm;
}
