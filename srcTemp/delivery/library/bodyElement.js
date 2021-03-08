
import {Valid} from "./validElements.js";

export class Body {
    constructor() {}

    render(line, imgExist, newMember, fadeIn) {
    
        let  valid = new Valid();

        const web       = 'https://www.ulozenka.cz';
        const imgPath   = 'https://www.ulozenka.cz/cdn/images/branches/destination/';
            $('#elements').html('');

        $('#delivery-view').html('');
        $('#delivery-view').append('<div id="delivery-name"></div>');
        $('#delivery-name').append('<span class="title"><i class="iGreen fas fa-truck"></i>&nbsp;Dopravca:<br /></span>');
        
        $('#delivery-name').append('<span class="view">' + line.name + '</span>');
        $('#delivery-name').append('<span class="inp"><input style="width:100%;" type="text" id="lineName" value="'+line.name+'" /></span>');
        $('#delivery-name').append('<br /><span id="lineNameError" class="error" style="width:100%"></span>');

            
        $('#elements').append('lineName~name~3~Názov musí mať aspoň 3 znaky~');
        //id, field, min-length, msg, 
        $('#elements').append('~~');
        //max-length-to, msg,
        //@CHR-ONLY
        $('#elements').append('~Iba znaky~X⌂'); 
        //regexp, msg, X not empty
    
    

        $('#delivery-view').append('<div id="delivery-image"></div>');
        $('#delivery-image').append('<img id="logo" />');
        $("#logo").prop('src', web + line.pic);

        if(line.odkaz.trim().length>0) {
            $('#delivery-view').append('<div id="delivery-web"></div>');
            $('#delivery-web').append('<span class="title"><i class="iGreen fas fa-sitemap"></i>&nbsp;Nájdete nás na internete:<br /></span>');
            $('#delivery-web').append('<a id="web"></a>');
            $("#web").prop("href", line.odkaz);
            $("#web").prop('target', 'parent');
            $("#web").append('<span class="view">'+line.odkaz+'</span>');
            $('#delivery-web').append('<span class="inp"><input style="width:100%;" type="text" value="'+line.odkaz+'" id="lineOdkaz"  /></span>');    
            $('#delivery-web').append('<br /><span id="lineOdkazError" class="error" style="width:100%"></span>');
            
            $('#elements').append('lineOdkaz~odkaz~~');
            //id, field, min-length, msg,         
            $('#elements').append('~~');
            //max-length-to, msg,
            $('#elements').append('@URL~Zadajte web adresu http(s)://...~⌂'); 
           //regexp, msg, X not empty
        }
    
        if(imgExist) {
            var image = $('<img src="https://www.ulozenka.cz/cdn/images/branches/destination/'+line.id+'.png" />');
            $('#delivery-view').append('<div id="delivery-image"><a id="image" href="https://www.ulozenka.cz/cdn/images/branches/destination/'+line.id+'.png" class="fancybox" rel="ligthbox" ><img id="image" class="zoom img-fluid" src="https://www.ulozenka.cz/cdn/images/branches/destination/' + line.id + '.png" /></a></div>');
            $(".fancybox").unbind();
            $(".fancybox").fancybox({openEffect: "none", closeEffect: "none"});
            $(".zoom").hover(function(){$(this).addClass('transition');}, function(){$(this).removeClass('transition');});
        }

        $('#delivery-view').append('<div id="delivery-open"></div>');
        $('#delivery-open').append('<span class="title"><i class="iGreen fas fa-door-open"></i>&nbsp;Otváracie hodiny:<br /></span>');
    
        let day = 1;
        let aDays = $('#daysName').html().split('~');

        let lineOpen;
        let checked;
        let isOpen; 
        let isClose; 
        for(let openH of Object.values(aDays)) {
            if(openH.length > 0) {
                $('#delivery-open').append('<div class="border open-line open-left open-line-new in-left-' + day + '"></div>');
                $('#delivery-open').append('<div class="border open-line open-right in-right-' + day + '"></div>');
                lineOpen = line.openingHours.find(element => element.day == day);
                $('.in-left-' + day).append(openH + ':');
                if(typeof lineOpen != 'undefined') {
                    $('.in-right-' + day).append('<span class="view">' + lineOpen.open + ' - ' + lineOpen.close + '</span>');
                } else {
                    $('.in-right-' + day).append('<span class="view">Zatvorené</span>');
                }
                checked  = '';
                if(typeof lineOpen == 'undefined') {
                    isOpen = ''; isClose = '';
                    checked  = 'checked="checked"';
                } else {
                     isOpen = lineOpen.open; isClose = lineOpen.close;
                }
                $('.in-right-' + day).append('<span class="inp"><input style="width:45px;" type="text" id="lineOpen-'+day+'"  value="'+isOpen+'" /> - ' + 
                    '<input style="width:45px;" type="text" id="lineClose-'+day+'"  value="'+isClose+'" />' + 
                    '&nbsp;&nbsp;&nbsp;<i class="fas fa-window-close"></i>:&nbsp;' +
                    '<input type="checkbox" '+checked+' id="lineClosed-'+day+'"  /></span>');
                
                $('#lineOpen-'+day).keyup(function() {
                    let valid = new Valid();
                    valid.inputValid();
                });

                $('#lineClose-'+day).keyup(function() {
                    let valid = new Valid();
                    valid.inputValid();
                });

                $('#lineClosed-'+day).click(function() {
                    let valid = new Valid();
                    valid.inputValid();
                });

                ++day;
                
                //onkeyup="inputValid()"
                //onkeyup="inputValid()"
                //onclick="inputValid()"
            }
        }
        
        $('#delivery-open').append('<br /><span id="lineOpenError" class="error" style="width:100%"></span>');

        $('#delivery-view').append('<div id="delivery-concat"></div>');
        $('#delivery-concat').append('<span class="title"><i class="iGreen far fa-comments"></i>&nbsp;Kontaktné informácie:<br /></span>');
        $('#delivery-concat').append('<div id="concat-detail" class="row justify-content-center"></div>');
        $('#concat-detail').append('<div id="delivery-concat-left" class="col-sm-5 mt-3">');
        $('#delivery-concat-left').append('<div id="state" class ="concat ">Česká Republika</div>');
        $('#delivery-concat-left').append('<div id="open">Po – Pá: 08:00 &#8211; 18:00 hod.</div>');
        $('#delivery-concat-left').append('<div id="phone">Tel: <a href="tel:+420777208204">+420 777 208 204</a></div>');
        $('#delivery-concat-left').append('<div id="mail">Email: <a href="mailto:info@ulozenka.cz">info@ulozenka.cz</a></div>');
        $('#concat-detail').append('<div id="delivery-concat-right" class="col-sm-5 mt-3">');
        $('#delivery-concat-right').append('<div id="state" class ="concat ">Slovenská Republika</div>');
        $('#delivery-concat-right').append('<div id="open">Po – Pá: 08:00 &#8211; 18:00 hod.</div>');
        $('#delivery-concat-right').append('<div id="phone">Tel: <a href="tel:+420777208204">+420 777 208 204</a></div>');
        $('#delivery-concat-right').append('<div id="mail">Email: <a href="mailto:info@ulozenka.cz">info@ulozenka.cz</a></div>');

        $('#delivery-view').append('<div id="delivery-navi"></div>');
        
        $('#delivery-navi').append('<div id="delivery-gps"></div>');
        $('#delivery-gps').append('<span class="title"><i class="iGreen fas fa-globe"></i></i>&nbsp;GPS:<br /></span>');
        $('#delivery-gps').append('<span class="view">' + line.lat.toString() + ' N, ' + 
            line.lng.toString() + ' E</span>');
        $('#delivery-gps').append('<span class="inp"><input style="width:90px;" type="text" id="lineLat" value="'+line.lat.toString().substr(0,line.lat.toString().length-1)+'" />' +
            'N, <input style="width:90px;" type="text" id="lineLng" value="'+line.lng.toString().substr(0,line.lng.toString().length-1)+'" />E');
    
        $('#delivery-gps').append('<div id="lineLatError" class="error" style="width:100%"></div>');
        $('#delivery-gps').append('<div id="lineLngError" class="error" style="width:100%"></div>');
    
        $('#elements').append('lineLat~lat~~GPS (latitude)-aspoň 4 znaky');
        //id, field, min-length, msg,         
        $('#elements').append('~~');
        //max-length-to, msg,
        $('#elements').append('@GPS-LA~GPS (latitude) má chybný formát~X⌂'); 
        //regexp, msg, X not empty
    
        $('#elements').append('lineLng~lng~~GPS (longitude)-aspoň 4 znaky');
        //id, field, min-length, msg,         
        $('#elements').append('~~');
        //max-length-to, msg,
        $('#elements').append('@GPS-LG~GPS (longitude) má chybný formát~X⌂'); 
        //regexp, msg, X not empty
    
        if(typeof line.mapsLink != 'undefined') {
            if(line.mapsLink.length > 0) {
                $('#delivery-navi').append('<div id="delivery-maps"></div>');
                $('#delivery-maps').append('<span class="title"><i class="iGreen fas fa-street-view"></i>&nbsp;Navigácia:<br /></span>');
                $('#delivery-maps').append('<span class="view"><a id="linkMaps"></a></span>');
                $('#linkMaps').prop({'href':line.mapsLink,'target':"parent"});
                $('#linkMaps').append('Zobraziť v google maps.');
                $('#delivery-maps').append('<span class="inp"><input style="width:100%;" type="text" id="lineMapsLink" value="'+line.mapsLink+'" /></span>');

                $('#delivery-maps').append('<br /><span id="lineMapsLinkError" class="error" style="width:100%"></span>');

                $('#elements').append('lineMapsLink~mapsLink~~');
                //id, field, min-length, msg,         
                $('#elements').append('~~');
                //max-length-to, msg,
                $('#elements').append('@GOOGLE-MAP~Chybný formát pre URL Google map ~X⌂'); 
                //regexp, msg, X not empty
            }
        }

        if($('#setJSON').html().indexOf('fas fa-link')==(-1)) {
            if(line.odkaz != 'http://') {
                $('#editJSON').css({'display':'inline'});
                $('#addJSON').css({'display':'none'});
            }
        } 
    
        valid.regExpElements();
        if(fadeIn)  {
            setTimeout(function(){ $('#delivery-view').fadeIn(1000); }, 300);
        } else {
            $('#delivery-view').css('display','inline');
            valid.setEdit(true);
        }    
    }
    
}
