<?php

include './globals.php';
use globals\Globals;

$fetchBody = json_decode($_POST['body'], true);
$userKey = $fetchBody['key'];
$serverName = Globals::$serverName;
$adminName = Globals::$adminName;
$pass = Globals::$pass;

$userKeyConn = new PDO("mysql: host=Globals::$serverName; dbname=$userKey", $adminName, $pass);
