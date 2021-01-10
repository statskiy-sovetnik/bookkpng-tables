<?php

use globals\Globals;
$adminName = Globals::$adminName;
$pass = Globals::$pass;
$serverName = Globals::$serverName;
$userKey = $_POST['key'];

try {
    $keyConn = new PDO("mysql:host=$serverName; dbname=$userKey", $adminName, $pass);
}
catch(PDOException $ex) {
    header('HTTP/1.1 520 Server connection error', 520);
    die();
}

//Получаем строки журнала

try {
    $getJournalRows = "SELECT * FROM journal";
    $rowsRes = $keyConn->query($getJournalRows);
    //Возвращаем пустой json объект
    if(!$rowsRes || $rowsRes->rowCount() == 0) {
        header('Content-Type: application/json', true);
        echo json_encode([]);
        die();
    }

    //Загружаем строки в ассоциативный массив
    $journalRows = [];
    $rowCounter = 0;
    $rowsNum = $rowsRes->rowCount();

    while($rowCounter < $rowsNum) {
        $rowCounter++;
        $curRow = [];
        $curResRow = $rowsRes->fetch();
        $curRowId = $curResRow['id'];

        foreach ($curResRow as $key => $value) {
            if($key === 'id' || gettype($key) === 'integer') {
                continue;
            }
            $curRow[$key] = $value;
        }
        unset($key, $value);

        $curRow[$curRowId] = $curRow;
    }

    header('Content-Type: application/json; charset=UTF-8', true);
    echo json_encode($journalRows);
}
catch(PDOException $ex) {
    header('HTTP/1.1 500 Mysql error', 500);
    die();
}

$keyConn = null;
