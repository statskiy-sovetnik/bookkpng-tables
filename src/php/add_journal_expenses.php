<?php

include './globals.php';
use globals\Globals;

$serverName = Globals::$serverName;
$adminName = Globals::$adminName;
$adminPassword = Globals::$pass;

$userKey = $_POST['key'];
$expenses = json_decode($_POST['expenses'], true);
$rowId = $_POST['row-id'];

try {
    $keyConn = new PDO("mysql:host=$serverName;dbname=$userKey", $adminName, $adminPassword);
}
catch (PDOException $ex) {
    header('HTTP/1.1 520 Server Connection Error', true,520);
    die();
}

//Добавляем расходы в журнал:
$expTableName = "expenses_journal_$rowId";
foreach ($expenses as $exp_id => $sum) {
    $addExpense = "INSERT INTO $expTableName(expense_id, sum)
                        VALUES ('$exp_id', '$sum') ON DUPLICATE KEY UPDATE sum=$sum";
    $keyConn->exec($addExpense);
}
unset($sum, $expid);

//Добавляем расходы в Доходы
/*$expTableName = "expenses_incomes_$rowId";
foreach ($expenses as $exp_id => $sum) {
    $addExpense = "INSERT INTO $expTableName(expense_id, sum)
                        VALUES ('$exp_id', '$sum') ON DUPLICATE KEY UPDATE sum=$sum";
    $keyConn->exec($addExpense);
}
unset($sum, $expid);*/

$keyConn = null;
