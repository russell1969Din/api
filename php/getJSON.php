<?
    if($_POST["protection"]!="ABNet") {die();}
    
    if(!isSet($_POST["local"])) {$_POST["local"] = '';}
    $local = $_POST["local"]==1;                      
    
    $options  = array('http' => array('user_agent' => 'Test User-Agent'));
    $context  = stream_context_create($options);


    
     
    if($local) {
        //$json = file_get_contents('http://api.abnet.sk/json/index.php');
        $json = file_get_contents('https://api.abnet.sk/json/index.php', false, $context);
    } else {
        //$json = file_get_contents('https://www.ulozenka.cz/gmap');
        $json = file_get_contents('https://www.ulozenka.cz/gmap', false, $context);
    }
    
    //
    echo($json);
    
    $phpDir = getCWD();
    if(!$local) {
        chDir('../');
        if(!is_dir('json')) {mkDir('json');}
        chDir('json');
        if(!is_file('index.php')) {
            $handle = fopen('index.php', 'w+');
            ///
            $localJson = str_replace (',"lat":', ',"mapsLink":"https://www.google.sk/maps/@48.1544473,17.1214649,15z","lat":', $json);
            fwrite($handle, $localJson);
            fclose($handle);
        }
    }

    chDir($phpDir);
?>