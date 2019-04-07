$(function() {
    //BUTTONS
    $("#clickon").button();
    $("#clickon").width(80);
    $( "#clickon" ).click(function() {
        if ($(this).hasClass("ui-state-active")){
            $(this).removeClass("ui-state-active");
            $(this).addClass("ui-state-default");
            $(this).text(" ");
            $(this).append("activate");
            activeClick=false;
        }else{
            $(this).addClass("ui-state-active");
            $(this).text(" ");
            $(this).append("deactivate");
            activeClick=true;
        }      
    });
    
    $(".startstop").button();
    $(".startstop").width(100);
    $(".startstop").click(function() {
        if ($(this).hasClass("ui-state-active")){
            $(this).removeClass("ui-state-active");
            $(this).addClass("ui-state-default");
            $( this ).text(" ");
            $( this ).append( "<span class='ui-icon ui-icon-play'></span>");
            $( this ).append(" Playback");
            stop = true;
            mainStop();
        }else{
            $(this).addClass("ui-state-active");
            $( this ).text(" ");
            $( this ).append( "<span class='ui-icon ui-icon-stop'></span>");
            $( this ).append(" Stop");
            stop = false;
            mainPlay();
        }      
    });
    
    $(".shift").button();
    
    $("#searchButton").button();
    $(".periodbutt").button();
    
    $(".gesture").button();
    $(".gesture").width(66);
    $(".gesture").click(function() {
        if ($(this).hasClass("ui-state-active")){
            $(this).removeClass("ui-state-active");
            $(this).addClass("ui-state-default");
            $( this ).text(" ");
            $( this ).append(" Arm");
            part[$(this).attr("value")].armed=false;
            
        }else{
            $(this).addClass("ui-state-active");
            $( this ).text(" ");
            $( this ).append(" Disarm");
            part[$(this).attr("value")].armed=true;
        }      
    });
    
    $(".edits").button();
    $(".edits").prop('disabled',true);
    $(".edits").button("refresh");
    
    $(".resetbutton").button();
    
    //WIDGETS
    $( "#slider1" ).slider({
        min: 29,
        max: 200,
        step: 1,
        value: 80,
        create: function( event, ui ) {
            $( "#bpm" ).text(80+" bpm");
        },
        slide: function( event, ui ) {
            var selection = $( this ).slider( "value" );
            $( "#bpm" ).text(selection+" bpm");
        },
        change: function( event, ui ) {
            setTimebase(beat[bpmChecked]);
            setTime(0);
            updateTimes();
            if (running){ mainStop(); mainPlay(); }
        }
    }); //bpm value
    $( "#slider1" ).dblclick(function() {
            $( this ).slider( "value", 60 );
            $( "#bpm" ).text(60+" bpm");
        })
    
    $( "#slider2" ).slider({
        min: -0.1,
        max: 10.2,
        step: 0.1,
        value: 10,
        create: function( event, ui ) {
            $( "#clickl" ).text(10);
        },
        slide: function( event, ui ) {
            var selection = $( this ).slider( "value" );
            $( "#clickl" ).text(selection);
            volumeClick=selection/10;
        }
        
    }); //click volume
    $( "#slider2" ).dblclick(function() {
        $( this ).slider( "value",10 );
        $( "#clickl" ).text(10);
    });
    
    $( ".sliderVol" ).slider({
        min: -0.1,
        max: 10.2,
        step: 0.1,
        value: 10,
        slide: function( event, ui ) {
            var selection = $( this ).slider( "value" );
            $( "#vol-"+$( this ).attr("value")).text(selection);
            volume[$( this ).attr("value")]=selection/10;
        },
        create: function( event, ui ) {
            $( "#vol-"+$( this ).attr("value")).text(10);
        }
    }); //parts volume
    $( ".sliderVol" ).dblclick(function() {
        $( this ).slider( "value",10 );
        $( "#vol-"+$( this ).attr("value") ).text(10);
        volume[$( this ).attr("value")]=1;
    });
    
    $( "#accordion" ).accordion({
        collapsible: true,
        active: false
    });
    
    $(".accordion-butt").click(function() {
        if ($( this ).hasClass( "ui-state-active" )) {
            read_active=true;
            read();
        }else{
            read_active=false;
        }
    });
    
    $( "#tabs" ).tabs();
    
    $( ".melting" ).controlgroup();
    $( ".melting" ).controlgroup("disable");
    
    $( ".timesig" ).selectmenu({
        width: 100
    });
    $(".off-opt").attr("disabled", true); // any other selector as you wish
    $(".timesig").selectmenu("refresh");
    
    $( "input[type='radio']" ).checkboxradio();
    $( "#bpm-ass-1" ).prop('checked', true);
    $( "input[type='radio']" ).checkboxradio("refresh");

    $( ".selector" ).checkboxradio( "refresh" );
    
    //FUNCTIONS    
    $("#learn").click(function() {
        $( this ).toggleClass( "ui-state-active" );
        $( this ).empty();
        var selection = $('input[name=radio-1]:checked').val();
        
        if ($( this ).hasClass( "ui-state-active" )) {
            $( "input[name=radio-1]" ).checkboxradio( "disable" );
            $( this ).text(" ");
            $( this ).append( "<span class='ui-icon ui-icon-stop'></span>");
            $( this ).append(" Stop learning");
            switch (selection){
            case "1":
                learnks();
                break;
            case "2":
                learnduo();
                break;
            case "3":
                learntre();
                break;                
            }
        }else{
            $( "input[name=radio-1]" ).checkboxradio( "enable" );
            $( this ).text(" ");
            $( this ).append( "<span class='ui-icon ui-icon-play'></span>");
            $( this ).append(" Start learning");
            switch (selection){
            case "1":
                stopks();
                break;
            case "2":
                stoptoms();
                break;
            case "3":
                stoplearnhats();
                break;                
            }   
        }
    }); //deprecated
    
    $( "#opener" ).click(function() {
        var selection = $('input[name=radio-1]:checked').val();
        switch (selection){
            case "1":
                $( "#dialog1" ).dialog( "open" );
                break;
            case "2":
                $( "#dialog2" ).dialog( "open" );
                break;
            case "3":
                $( "#dialog3" ).dialog( "open" );
                break;                
        }
    }); //deprecated
    
    //OTHER - all //deprecated
    $( "#dialog1" ).dialog({ autoOpen: false });
    $( "#dialog2" ).dialog({ autoOpen: false });
    $( "#dialog3" ).dialog({ autoOpen: false });
    
});