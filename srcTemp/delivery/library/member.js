import {Library } from "./library.js";

export class Member {
    constructor() {} 
    
    emptyMember() {

        var json = JSON.parse($('#object').html());
        let newID = json.reduce((acc, line) => acc = acc > line.id ? acc : (line.id+1), 0);
    
        let inArray='';    
        let aLine;
        var first = true;

        for(let d=1;d<2;++d) {
            if(!first) {inArray+=',';}
                inArray+='{'+
                '"branch_id":'+newID+','+
                '"open":"",'+
                '"close":"",'+
                '"day": '+d+','+
                '}';
                first = false;
        }
        let eOpen = '['+inArray+']';

        let eCode = 'aLine = '+
            '{'+
                '"id":'+newID+','+
                '"name":"",'+
                '"lat":0,'+
                '"lng":0,'+
                '"register":1,'+
                '"destination":1,'+
                '"odkaz":"http://",'+
                '"mapsLink":"https://www.google.sk/maps/@48.1544473,17.1214649,15z",'+
                '"transport_id":1,'+
                '"shortcut":"xxxxx",'+
                '"active":1,'+
                '"public":1,'+
                '"pic":"/images/partners/wedo-ulozenka.png",'+
                '"openingHours":'+eOpen+','+
                '"announcements":[]'+
            '}';
        eval(eCode);
        return aLine;
    }
    
    saveMember(newMember) {

        var memberID; 
        var json = JSON.parse($('#object').html());
        if($('#deliveries').val().trim().length>0) {
            var line = json.find(line => line.id == $('#deliveries').val());
            memberID = line.id; 
        } else {
            memberID = json.reduce((acc, line) => acc = acc > line.id ? acc : (line.id+1), 0);
        }

        let inArray='';    
        var first = true;
        for(let d=1;d<8;++d) {
            if(!$('#lineClosed-'+d).prop('checked')) {
            if(!first) {inArray+=',';}
                inArray+='{'+
                    '"branch_id":'+memberID+','+
                    '"open":"'+$('#lineOpen-'+d).val()+'",'+
                    '"close":"'+$('#lineClose-'+d).val()+'",'+
                    '"day": '+d+','+
                '}';
                first = false;
            }
        }

        let eOpen = '['+inArray+']';
    
        let destination;
        let register;
        let transport_id;
        let shortcut;
        let active;
        let xpublic;
        let announcements;
        if($('#deliveries').val().trim().length>0) {
            register = line.register;
            destination = line.destination;
            transport_id = line.transport_id;
            shortcut = line.shortcut;
            active = line.active;
            xpublic = line.public;
            announcements = line.announcements;
        } else {
            register = 1;
            destination = 1;
            transport_id = 1;
            shortcut = 'xxxxx';
            active = 1;
            xpublic = 1;
            announcements = [];
            var json = JSON.parse($('#object').html());
            memberID = json.reduce((acc, line) => acc = acc > line.id ? acc : (line.id+1), 0);
        }

        let aLine;
        let eCode = 'aLine = '+
            '{'+
                '"id":'+memberID+','+
                '"name":"'+$('#lineName').val()+'",'+
                '"lat":'+$('#lineLat').val()+','+
                '"lng":'+$('#lineLng').val()+','+
                '"register":'+register+','+
                '"destination":'+destination+','+
                '"odkaz":"'+$('#lineOdkaz').val()+'",'+
                '"mapsLink":"'+$('#lineMapsLink').val()+'",'+
                '"transport_id":'+transport_id+','+
                '"shortcut":"'+shortcut+'",'+
                '"active":'+active+','+
                '"public":'+xpublic+','+
                '"pic":"/images/partners/wedo-ulozenka.png",'+
                '"openingHours":'+eOpen+','+
                '"announcements":[]'+
            '}';

        if($('#deliveries').val().trim().length>0) {
            for(var i = 0; i < json.length; i++) {
                if(json[i].id == line.id) {json.splice(i, 1);break;}
            }      
        }

        eval(eCode);
        json.push(aLine);
        var paramJSON = JSON.stringify(json);
    
        $.ajax({
            url:"/php/writeJSON.php",
            method:'POST',
            data:{
                protection:  "ABNet",
                json:paramJSON,
            },
            success:function(data){
                $.ajax({
                    url:"/php/getJSON.php",
                    method:'POST',          
                    data:{
                        protection:  "ABNet",
                        local:  1,
                    },
                    success:function(data){
                        $('#object').html(data);
                        let library = new Library();
                        library.getDeliveries(memberID);
                        library.urlExists(aLine, true);
                        $('#saveJSON').css('display','none');
                        $('#saveJSON').css('color','#b0b0b0');
                        $('#saveJSON').unbind();
                        $('#outJSON').css('display','none');
                        if($('#delivery-view').html().length==0 || $('#delivery-view').css('display')=='none') {
                            $('#addJSON').css('display','inline');
                        } else {
                            $('#editJSON').css('display','inline');
                        }
                    }
                });
            }
        });
    }    
}
    
    
