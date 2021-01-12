<?php

include './globals.php';
use globals\Globals;

$adminName = Globals::$adminName;
$pass = Globals::$pass;
$serverName = Globals::$serverName;
$userKey = $_POST['key'];

try {
    $keyConn = new PDO("mysql:host=$serverName; dbname=$userKey", $adminName, $pass);
}
catch(PDOException $ex) {
    header('HTTP/1.1 520 Server connection error', true,520);
    die();
}

//Получаем id доходов (т.к. каждой строке доходов соответствует таблица с raw_mat_usage)

try {
    $getIncomesIds = "SELECT id FROM incomes ORDER BY id";
    $incomesIdsRes = $keyConn->query($getIncomesIds);
    if(!$incomesIdsRes || $incomesIdsRes->rowCount() == 0) {
        header('Content-Type: application/json', true);
        echo json_encode([]);
        die();
    }

    $incomesRowsNum = $incomesIdsRes->rowCount();
    $arr_ind = 0;
    $c = 0;
    $rawMatUsage = [];
    while($c < $incomesRowsNum) {
        $curIncomesId = $incomesIdsRes->fetch()['id'];

        //Берём таблицу raw_mat_usage, соответствующую текущему id
        $getRawMatUsage = "SELECT * FROM raw_mat_usage_$curIncomesId";
        $rawMatUsageRes = $keyConn->query($getRawMatUsage);
        if(!$rawMatUsageRes || $rawMatUsageRes->rowCount() == 0) {
            $c++;
            continue; //ничего не добавляем в rawMatUsage
        }

        //Добавляем в общий массив
        $curRawMatUsage = [];
        $curRawMatUsage['incomes_id'] = $curIncomesId;
        $curRawMatUsage['raw_mat_used'] = []; //в js это будет массив с объектами типов сырья
        $rawMatCount = $rawMatUsageRes->rowCount();
        $i = 0;

        while($i < $rawMatCount) {
           $curRawMatUsageRes = $rawMatUsageRes->fetch();
           $curRawMatUsage['raw_mat_used'][$i]['journal_id'] = $curRawMatUsageRes['journal_id'];
           $curRawMatUsage['raw_mat_used'][$i]['used'] = $curRawMatUsageRes['used'];
           $i++;
        }
        $rawMatUsage[$arr_ind] = $curRawMatUsage;

        $c++;
        $arr_ind++;
    }

    //Отправляем ответ
    header('Content-Type: application/json; charset=UTF-8', true);
    echo json_encode($rawMatUsage);
}
catch(Exception $ex) {
    header('HTTP/1.1 500 Mysql error', true,500);
    die();
}

