<?php
$initDatabase = 'origindb';
$serverName = '127.0.0.1:3310';
$adminName = 'mmmNice';
$adminPassword = '123098Phpadmin';

try {
    $initConn = new PDO("mysql:host=$serverName;dbname=$initDatabase", $adminName, $adminPassword);
}
catch (PDOException $ex) {
    header('HTTP/1.1 520 Server Connection Error', 520);
    die();
}



