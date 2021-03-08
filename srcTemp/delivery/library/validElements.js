import {Member} from "./member.js";

export class Valid {
    constructor() {}

    regExpElements() {
        var aElements = $('#elements').html().substr(0,$('#elements').html().length-1).split('⌂');
    
        let aElemChild;
        for(let e=0;e<aElements.length;++e) {
            
            aElemChild = aElements[e].split('~');
            if(aElemChild[0].indexOf('()')==(-1)) {
                //this.inputValid('"+aElements[e]+"');
                $('#'+aElemChild[0]).keyup(function() {
                    let valid = new Valid();
                    valid.inputValid(aElements[e]);
                });
                //eval("$('#"+aElemChild[0]+"').keyup(function() {this.inputValid('"+aElements[e]+"');});");
            }
        }
    }    
    
    inputValid() {
        let aElements;
        let aElement;
        let id;
        let error = false;
        let msg = '';
        let eCode;
        let regExp;

        aElements = $('#elements').html().substr(0,$('#elements').html().length-1).split('⌂');
        for(let e=0;e<aElements.length;++e) {
            aElement = aElements[e].split('~');
            id = aElement[0];

            $('#'+id+'Error').val('');
            $('#'+id+'Error').css('display','none');
            $('#'+id).css('border','solid 1px #000');
            if(aElement[2].length>0 && !error) {
                if($('#'+id).val().trim().length<aElement[2]) {msg = aElement[3]; error = true;}
                if(error) break;
            }
            if(aElement[4].length>0 && !error) {
                if($('#'+id).val().trim().length>aElement[4]) {msg = aElement[5]; error = true;}
                if(error) break;
            }
            if(aElement[6].length>0 && !error) { 
                let x = this.getReg(aElement[5]);
                error = !x.test($('#'+id).val());
                if($('#'+id).val().trim().length==0 && aElement[7].toUpperCase()!='X') {
                    error=false;
                }
                if(error) {msg = aElement[6]; break;}
            }
        }
    
        if(!error) {error = this.validOpen();}
    
        if(error) {
            $('#'+id).css('border','solid 2px #cc0000');
            $('#'+id+'Error').html(msg);
            $('#'+id+'Error').css('display','inline');
        } else {
            $('#'+id).css('border','solid 1px #000');
            $('#'+id+'Error').html(msg);
            $('#'+id+'Error').css('display','none');
        }
        this.isError(error);
    
        return error;
    }


    validOpen() {
        const week = 7;
        const aDays = $('#daysName').html().split('~');
        let msg;
        let error = false;
        let regExp = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    
        for(let d=1;d<aDays.length;++d) {             
            $('#lineOpen-'+d).css('border','solid 1px #000');
            $('#lineClose-'+d).css('border','solid 1px #000');

            if(!$("#lineOpen-"+d).length ) {break;}        
            if($('#lineClosed-'+d).prop('checked')) {
                $('#lineOpen-'+d).val('');
                $('#lineClose-'+d).val('');
            } else {
                if(!regExp.test($('#lineOpen-'+d).val())) {
                    $('#lineOpen-'+d).css('border','solid 2px #cc0000'); 
                    error = true;
                    msg = aDays[d] + ' čas otvárania je chybný formát (00:00 až 23:59)';
                    break;
                }
                if(!regExp.test($('#lineClose-'+d).val())) {
                    $('#lineClose-'+d).css('border','solid 2px #cc0000');
                    error = true;
                    msg = aDays[d] + ' čas zatvárania je chybný formát (00:00 až 23:59)';
                    break;
                }
            }
        }
        $('#lineOpenError').html('');  
        if(error) {$('#lineOpenError').html(msg);}
        return error;
    }    
    
    getReg(mask) {
        let rg;
        switch(mask) {
            case '@URL': {
                rg = /^((?:https?:\/\/)?(?:www\.)?[-\w@:%.+~#=]{2,256}\.[a-z]{2,6}\b[-\w@:%+.~#?&\/=]*|)$/; break;
            }
            case '@CHR-ONLY': {
                rg = /^[a-zA-Z]+$/; break;
            }
            case '@GPS-LA': {
                rg = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/; break;
            }
            case '@GPS-LG': {
                rg = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/; break;
            }
            case '@GOOGLE-MAP': {
                rg = /^https?\:\/\/(www\.)?google\.[a-z]+\/maps\b/; break;
            }
        }                                 
        return rg;
    }

    setEdit(edit) {
        let inp;
        let view;
        let error;
        if(edit) {view='none'; inp='inline'; error='inline';} else {view='inline'; inp='none';error='none';}
    
        $('.view').css('display',view);
        $('.inp').css('display',inp);
        $('.error').css('display',error);

        var json = JSON.parse($('#object').html());
        var line = json.find(line => line.id == $('#deliveries').val());
        if(typeof line != 'undefined') {
            if(!edit) {
                for(let oHours of Object.values(line.openingHours)) {
                    $('#lineOpen-'+oHours.day).val(oHours.open);
                    $('#lineClose-'+oHours.day).val(oHours.close);
                }
                for(day=1;day<8;++day) { 
                    $('#lineClosed-'+day).prop('checked', false);
                    var isDay = line.openingHours.find( openingHours => openingHours.day == day);
                    if(typeof isDay == 'undefined') $('#lineClosed-'+day).prop('checked', true);
                }
            }    
            let aElements = $('#elements').html().substr(0,$('#elements').html().length-1).split('⌂');
            let element;
            let eCode;
            let field;
            for(let e=0;e<aElements.length;++e) {
                element = aElements[e].split('~')[0];
                if(element.indexOf('()')==(-1)) {
                    field = aElements[e].split('~')[1];
                    eval("$('#"+element+"').val(line."+field+");");
                }
            }       
        }
        $('input').css('border','solid 1px #000');
        $('.error').html('');
    }
    
    isError(error) {

        var saveID = $('#deliveries').val();
        if(!error) {
            $('#saveJSON').unbind();
            $('#saveJSON').click(function() {
                $('#saveJSON').css('display','none');
                $('#outJSON').css('display','none');
                if($('#delivery-view').html().length==0 || $('#delivery-view').css('display')=='none') {
                    $('#addJSON').css('display','inline');
                } else {
                    $('#editJSON').css('display','inline');
                }
                let member = new Member();
                member.saveMember(false);
            })
            $('#saveJSON').css('color','#960093');
            $('#saveJSON').css('cursor','pointer');
        } else {
            $('#saveJSON').css('color','#b0b0b0');
            $('#saveJSON').unbind();
            $('#saveJSON').css('cursor','auto');
        }
    }

}