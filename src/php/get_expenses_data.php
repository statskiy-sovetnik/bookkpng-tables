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
    header('HTTP/1.1 520 Server connection error', true, 520);
    die();
}

try {
    $getExpensesData = "SELECT * FROM expenses_data";
}
catch(PDOException $ex) {
    header('HTTP/1.1 500 Mysql error', true, 500);
    die();
}
