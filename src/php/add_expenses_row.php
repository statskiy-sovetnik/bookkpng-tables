<?php

include './globals.php';
use globals\Globals;

$serverName = Globals::$serverName;
$adminName = Globals::$adminName;
$adminPassword = Globals::$pass;

$userKey = $_POST['key'];
$expDate = $_POST['date'];
$expSum = $_POST['sum'];
$expId = $_POST['expense_id'];

try {
    $keyConn = new PDO("mysql:host=$serverName;dbname=$userKey", $adminName, $adminPassword);
}
catch (PDOException $ex) {
    header('HTTP/1.1 520 Server Connection Error', true,520);
    die();
}

//Добавляем ряд
try {
    $addExpenseRow = "INSERT INTO expenses(expense_id, date, sum)
                        VALUES ('$expId', '$expDate', '$expSum')";
    $keyConn->exec($addExpenseRow);
}
catch(Exception $ex) {
    header('HTTP/1.1 500 Mysql Error', true,500);
}

