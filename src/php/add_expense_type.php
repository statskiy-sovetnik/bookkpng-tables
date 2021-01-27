<?php

include './globals.php';
use globals\Globals;

$serverName = Globals::$serverName;
$adminName = Globals::$adminName;
$adminPassword = Globals::$pass;

$userKey = $_POST['key'];
$expenseName = $_POST['exp-name'];
$expenseColor = $_POST['exp-color'];

try {
    $keyConn = new PDO("mysql:host=$serverName;dbname=$userKey", $adminName, $adminPassword);
}
catch (PDOException $ex) {
    header('HTTP/1.1 520 Server Connection Error', true,520);
    die();
}

//Добавляем тип расходов
try {
    $addExpType = "INSERT INTO expenses_data(name, color)
                    VALUES ('$expenseName', '$expenseColor')";
    $keyConn->exec($addExpType);
}
catch (PDOException $ex) {
    header('HTTP/1.1 500 Mysql Error', true,500);
    die();
}
