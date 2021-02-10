<?php

include './globals.php';
use globals\Globals;

$serverName = Globals::$serverName;
$adminName = Globals::$adminName;
$adminPassword = Globals::$pass;

$userKey = $_POST['key'];

try {
    $keyConn = new PDO("mysql:host=$serverName;dbname=$userKey", $adminName, $adminPassword);
}
catch (PDOException $ex) {
    header('HTTP/1.1 520 Server Connection Error', true,520);
    die();
}

//Получаем id таблицы расходов
try {
    $getExpensesIds = "SELECT id from expenses";
    $expensesIdsRes = $keyConn->query($getExpensesIds);
    if(!$expensesIdsRes) {
        die();
    }
}
catch(Exception $ex) {
    header('HTTP/1.1 500 Mysql Error', true,500);
    die();
}

//Получаем данные об использовании расходов
try {
    $expUsageObj = [];
    $expIdCount = 0;
    $expIdsNum = $expensesIdsRes->rowCount();
    while($expIdCount < $expIdsNum) {
        $curExpId = $expensesIdsRes->fetch()['id'];
        //Берём соответствующую таблицу
        $getUsageData = "SELECT * from expenses_usage_$curExpId";
        $usageDataRes = $keyConn->query($getUsageData);
        if(!$usageDataRes) {
            $expUsageObj[$expIdCount] = [];
            $expIdCount++;
            continue;
        }

        //Добавляем в общий объект
        $usageRowsNum = $usageDataRes->rowCount();
        $i = 0;
        $curUsageData = [];
        while($i < $usageRowsNum) {
            $incUsageObj = [];
            $curUsageDataResRow = $usageDataRes->fetch();
            $incUsageObj['incomes_id'] = $curUsageDataResRow['incomes_id'];
            $incUsageObj['sum'] = $curUsageDataResRow['sum'];

            $curUsageData[$i] = $incUsageObj;
            $i++;
        }

        $expUsageObj[$curExpId] = $curUsageData;
        $expIdCount++;
    }

    echo json_encode($expUsageObj);
}
catch(Exception $ex) {
    header('HTTP/1.1 500 Mysql Error', true,500);
    die();
}