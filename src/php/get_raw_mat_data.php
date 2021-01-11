<?php

include './globals.php';
use globals\Globals;

$userKey = $_POST['key'];
$serverName = Globals::$serverName;
$adminName = Globals::$adminName;
$pass = Globals::$pass;

try {
    $userKeyConn = new PDO("mysql:host=$serverName; dbname=$userKey", $adminName, $pass);
}
catch(PDOException $ex) {
    header('HTTP/1.1. 520 Server connection error', true,520);
    die();
}

//Берём информацию о сырье из бд

$raw_mat_data = [];
try {
    $selectRawMatData = "SELECT *
                        FROM raw_mat_data";
    $rawMatDataRows = $userKeyConn->query($selectRawMatData);

    //Если нет строк в выдаче
    if(!$rawMatDataRows) {
        echo json_encode($raw_mat_data);
        die();
    }

    $rowsNum = $rawMatDataRows->rowCount();
    $rowCounter = 0;

    while($rowCounter < $rowsNum) {
        $rowCounter++;
        $curRow = $rawMatDataRows->fetch();
        $cur_raw_mat_assoc = [];
        $cur_raw_mat_id = $curRow['id'];
        foreach ($curRow as $key => $value) {
            if($key === 'id' || gettype($key) === 'integer') {
                continue;
            }
            $cur_raw_mat_assoc[$key] = $value;
        }
        unset($key, $value);
        $raw_mat_data[$cur_raw_mat_id] = $cur_raw_mat_assoc;
    }

    //Передаём json с ответом

    header('Content-Type: application/json; charset=UTF-8', true);
    echo json_encode($raw_mat_data);
}
catch(PDOException $ex) {
    header('HTTP/1.1. 500 Mysql error', true,500);
    die();
}

$userKeyConn = null;
