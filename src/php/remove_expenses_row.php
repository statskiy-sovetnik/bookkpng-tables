<?php

include './globals.php';
use globals\Globals;

$serverName = Globals::$serverName;
$adminName = Globals::$adminName;
$adminPassword = Globals::$pass;

$userKey = $_POST['key'];
$rowId = $_POST['row_id'];

try {
    $keyConn = new PDO("mysql:host=$serverName;dbname=$userKey", $adminName, $adminPassword);
}
catch (PDOException $ex) {
    header('HTTP/1.1 520 Server Connection Error', true,520);
    die();
}

//Удаляем ряд и таблицу с использованием расходов
try {
    $removeExpRow = "DELETE FROM expenses WHERE id='$rowId'";
    $keyConn->exec($removeExpRow);
    echo $keyConn->errorInfo()[2];

    $removeUsageTable = "DROP TABLE expenses_usage_$rowId";
    $keyConn->exec($removeUsageTable);
}
catch (Exception $ex) {
    header('HTTP/1.1 500 Mysql Error', true,500);
    die();
}
