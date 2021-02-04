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
    //Возвращаем id созданного типа
    $getExpTypeId = "SELECT id FROM expenses_data ORDER BY id DESC LIMIT 1";
    $expTypeIdRes = $keyConn->query($getExpTypeId);
    if($expTypeIdRes) {
        echo $expTypeIdRes->fetch()['id'];
    }
}
catch (PDOException $ex) {
    header('HTTP/1.1 500 Mysql Error', true,500);
    die();
}

$keyConn = null;