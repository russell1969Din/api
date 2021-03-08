import {System} from "../../srcRoot/system.js";
import {Library} from "./library/library.js";
import {Member} from "./library/member.js";
import {Valid} from "./library/validElements.js";

export class Delivery {

    constructor() {}
    
    renderDelivery() {
        let library = new Library();
    
        $('#daysName').html('~Pondelok~Utorok~Streda~Štvrtok~Piatok~Sobota~Nedela');
    
        $.ajax({
            url:"../../php/getJSON.php",
            method:'POST',
            data:{
                protection:  "ABNet",
                local:  0,
            },
            success:function(data){
                $('#object').html(data);
                let library = new Library();
                library.getDeliveries();
            }
        });
        $('#deliveries').change(function() { 
            if($('#deliveries').val()>0)
            {
                library.getDelivery();
            }
        });                   
        
        $('#setJSON').unbind();
        $('#setJSON').click(function() {
            let setLocal = 0;
            if($('#setJSON').html().indexOf('fas fa-link')!=(-1)) {
                $('#setJSON').html('<i class="fas fa-save"></i>&nbsp;Lokálne dáta');
                $('#setJSON').css('color','#cc0000');       
                $('#addJSON').css('display','inline');
                setLocal = 1;
            } else {
                $('#setJSON').html('<i class="fas fa-link"></i>&nbsp;https://www.ulozenka.cz');
                $('#setJSON').css('color','green');
                $('#addJSON').css('display','none');
                $('#editJSON').css('display','none');
                $('#outJSON').css('display','none')
                $('#saveJSON').css('display','none');
                setLocal = 0;
            }
            $('#delivery-view').html('');
            $("#deliveries").val(0).change();    
            $.ajax({
                url:"/php/getJSON.php",
                method:'POST',
                data:{
                    protection:  "ABNet",
                    local:  setLocal,
            },
            success:function(data){
                $('#object').html(data);
                $('#delivery-view').html('');
                $('#deliveries').select2('data', null);
                library.getDeliveries();
            }
        });
    
        $('#deliveries').unbind();
        $('#deliveries').change(function() { 
            if($('#setJSON').html().indexOf('fas fa-link')==(-1)) {
                $('#saveJSON').css('display','none');
                $('#outJSON').css('display','none');
            }
            library.getDelivery();
        });        
        });
    
        $('#addJSON').unbind();
        $('#addJSON').click(function() {
            $('#saveJSON').css('display','inline');
            $('#outJSON').css('display','inline');
            $('#editJSON').css('display','none');
            $('#addJSON').css('display','none');
            let library = new Library();
            let member = new Member();
            library.urlExists(member.emptyMember(), false);
            let valid = new Valid();
            valid.setEdit(true);
        })
    
        $('#editJSON').unbind();
        $('#editJSON').click(function() {
            $('#saveJSON').css('display','inline');
            $('#outJSON').css('display','inline');
            $('#editJSON').css('display','none');
            $('#addJSON').css('display','none');
            let valid = new Valid();
            valid.setEdit(true);
        })
        $('#outJSON').unbind();
        $('#outJSON').click(function() {
            $('#saveJSON').css('display','none');
            $('#outJSON').css('display','none');
            if($('#delivery-view').html().length==0 || $('#delivery-view').css('display')=='none') {
                $('#addJSON').css('display','inline');
            } else {
                $('#editJSON').css('display','inline');
            }
            $('#saveJSON').css('color','#b0b0b0');
            $('#saveJSON').unbind();
            
            let valid = new Valid();
            valid.setEdit(false);
        })
        
        let delay = 250;
        setTimeout(function()   { 
            $('#setJSON').css('color','#cc0000');
            $('.hand').css('color','#cc0000');
            setTimeout(function()   { 
                $('#setJSON').css('color','green');
                $('.hand').css('color','green'); 
                setTimeout(function()   { 
                    $('#setJSON').css('color','#cc0000');
                    $('.hand').css('color','#cc0000');
                    setTimeout(function()   { 
                        $('#setJSON').css('color','green');
                        $('.hand').css('color','green'); 
                        setTimeout(function()   { 
                            $('#setJSON').css('color','#cc0000');    
                            $('.hand').css('color','#cc0000');
                            setTimeout(function()   { 
                                $('#setJSON').css('color','green');
                                $('.hand').css('color','green'); 
                                setTimeout(function()   { 
                                    $('#setJSON').css('color','#cc0000');
                                    $('.hand').css('color','#cc0000');
                                    setTimeout(function()   { 
                                        $('#setJSON').css('color','green');
                                        $('.hand').css('display','none');
                                    }, delay); 
                                }, delay); 
                            }, delay); 
                        }, delay);
                    }, delay); 
                }, delay); 
            }, delay); 
        }, delay);
        
    
    }
}
