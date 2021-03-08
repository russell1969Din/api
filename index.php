<!DOCTYPE html>                          

<html lang="sk">
 <head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Dopravcovia</title>
    <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="description" content="" />
    <meta name="keywords" content="" />
    <meta name="author" content="" />
    <meta name="classification" content="" />
    <link href="//fonts.googleapis.com/css?family=Open+Sans:300,400,400italic,600&amp;subset=latin,latin-ext" rel="stylesheet" type="text/css" />
    <!--link rel="shortcut icon" type="image/x-icon" href="icon.jpg" />-->
    
    <link rel="icon" type="image/jpg" href="icon.jpg">    
    
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
    
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.css" media="screen">
        <script src="//cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.js"></script>    
    
    <link href="/css/global.css" rel="stylesheet" media="screen" />
    <link href="/css/deliveries.css" rel="stylesheet" media="screen" />
    
    <script src="/js/select2.min.js" type="text/javascript"></script>
    <script src="/js/sl-service-catalog.min.js" type="text/javascript"></script>
    <link href="/css/select2.min.css" rel="stylesheet" />
</head>
<body id="">
<script type="text/javascript">
$(function () {
    slServiceCatalog.initSelect2({
        $selectElement: $("#deliveries"),
        pageSize: 100,
        useServiceCatalogDataAdapter: true,
        select2Options: { minimumInputLength: 0 },
        customMatcherOptions: { prefixSearch: false },
    });

    $("#deliveries").on("select2:select", function (e) {
        if (e.params.data.id == 0) return;
        var selector = "div.si_" + e.params.data.id;
        $(".service-description-wrap div").hide();
        $(selector).show("slow");
    });
});
</script>

<div class="container">

    <div id="deliveries-menu" class="container fixed-top" >   
        <span id="setJSON" class="keyJSON">
            <i class="fas fa-link"></i>&nbsp;https://www.ulozenka.cz
            <i class="far fa-hand-point-left hand"></i>
        </span>

        <span id="addJSON" class="keyJSON">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <i class="fas fa-user-edit"></i>&nbsp;Nový&nbsp;dopravca
        </span>

        <span id="editJSON" class="keyJSON">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <i class="fas fa-user-edit"></i>&nbsp;Editovať
        </span>
        <span id="saveJSON" class="keyJSON">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <i class="fas fa-save"></i>&nbsp;Zapísať
        </span>
        <span id="outJSON" class="keyJSON">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <i class="fas fa-sign-out-alt"></i>&nbsp;Bez zápisu
        </span>
    </div>

    <div id="deliveries-workspace" >  
        <p class="title"><i class="iGreen fas fa-caret-square-down"></i>&nbsp;Zvoľte dopravcu</p>
        <span id="select2In">
            <select name="" id="deliveries" class=""></select>
        </span>
    </div>

    
    <div id="workSpace_css" ></div>
    <div id="webURL" ></div>
    <div id="delivery-view" ></div>
    <div id="object"></div>
    <div id="elements"></div>
    <div id="daysName"></div>
    <script id="main"  src="/srcRoot/main.js" type="module"></script>
</div>
</body>
</html>

<script>
function undefinedIs(param) {if(typeof param != 'undefined') return param; else return '';}
</script>