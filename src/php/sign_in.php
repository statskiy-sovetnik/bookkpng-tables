<?php

include './globals.php';
use globals\Globals;

$serverName = Globals::$serverName;
$initialDb = 'origindb';
$adminName = Globals::$adminName;
$adminPassword = Globals::$pass;
$passwordAlgo = 'sha256';

$userKey = $_POST['key'];
$userEmail = $_POST['email'];
$userPass = $_POST['password'];

try {
    $initConn = new PDO("mysql:host=$serverName;dbname=$initialDb", $adminName, $adminPassword);
}
catch (PDOException $ex) {
    header('HTTP/1.1 520 Server Connection Error', true, 520);
    die();
}

// Подключаемся к пользовательской бд

try {
    $userDbConn = new PDO("mysql:host=$serverName;dbname=$userKey", $adminName, $adminPassword);
}
catch (PDOException $ex) {
    header('HTTP/1.1 507 Server Connection Error', true, 507);
    die();
}

//Проверяем пароль

try {
    $sqlGetPassHash = "SELECT password_hash FROM accounts_data WHERE account_key='$userKey'";
    $passResult = $initConn->query($sqlGetPassHash);
    $userPassHash = hash($passwordAlgo, $userPass);

    if(!$passResult || $passResult->rowCount() == 0) {
        header('HTTP/1.1 500 Mysql error', true, 500);
        die();
    }

    $dbPassHash = $passResult->fetch()['password_hash'];

    if($dbPassHash != $userPassHash) {
        header('HTTP/1.1 504 Wrong password', true, 504);
        die();
    }
}
catch (PDOException $ex) {
    header('HTTP/1.1 500 Mysql error', true, 500);
    die();
}

//Добавляем пользователя

try {
    $addUserSql = "INSERT INTO db_users(email) 
                   VALUES ('$userEmail')";
    $userDbConn->exec($addUserSql);
}
catch (PDOException $ex) {
    header('HTTP/1.1 500 Mysql error', true, 500);
    die();
}


$initConn = null;
$userDbConn = null;

