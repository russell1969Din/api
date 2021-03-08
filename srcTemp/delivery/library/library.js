import {Body} from "./bodyElement.js";


export class Library {
    constructor() {}

    getDeliveries(selectID='') {  
        var json = JSON.parse($('#object').html());
        if(selectID.length==0) selectID = $('#deliveries').val();
        $('#deliveries').html('').select2();
        $("#deliveries").append('<option value=""></option>');
        for(let line of Object.values(json)) {
            $("#deliveries").append('<option value="' + line.id + '">' + line.id + ' :: ' + line.name + '</option>');
        }
        $('#deliveries').val(selectID).trigger('change');
    }

    getDelivery() {
        var json = JSON.parse($('#object').html());
        var line = json.find(line => line.id == $('#deliveries').val());
        if(typeof line != 'undefined') this.urlExists(line, true);
    }
    
    urlExists(line, fadeIn) {
        let body = new Body();
        const imgPath   = 'https://www.ulozenka.cz/cdn/images/branches/destination/';
        let imgExist;
        var image = new Image();
        var url_image = imgPath + line.id + '.png';
        image.src = url_image;                    
        image.onload = function()   {body.render(line, true, false, fadeIn);}   
        image.onerror = function()  {body.render(line, false, false, fadeIn);}  
        return null;
    }

}


