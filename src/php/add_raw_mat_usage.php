<?php

include './globals.php';
use globals\Globals;

$initDatabase = Globals::$initDb;
$serverName = Globals::$serverName;
$adminName = Globals::$adminName;
$adminPassword = Globals::$pass;

$rowsUsage = json_decode($_POST['rows-usage'], true);
$userKey = $_POST['key'];
$incomesRowId = $_POST['incomes-row-id'];

try {
    $keyConn = new PDO("mysql:host=$serverName;dbname=$userKey", $adminName, $adminPassword);
}
catch (PDOException $ex) {
    header('HTTP/1.1 520 Server Connection Error', true,520);
    die();
}

//Добавляем данные об использовании сырья этой строки

try {
    $usageTableName = "raw_mat_usage_$incomesRowId";
    foreach ($rowsUsage as $journal_id => $used) {
        $addUsageData = "INSERT INTO $usageTableName(journal_id, used)
                            VALUES ('$journal_id', '$used') ON DUPLICATE KEY UPDATE used=$used";
        $keyConn->exec($addUsageData);
    }
    unset($journal_id, $used);
}
catch(Exception $ex ) {
    header('HTTP/1.1 Error while adding usage data', true, 500);
    die();
}

$keyConn = null;
