<?php

include './globals.php';
use globals\Globals;

$serverName = Globals::$serverName;
$adminName = Globals::$adminName;
$adminPassword = Globals::$pass;

$userKey = $_POST['key'];
$expId = $_POST['expense_id'];

try {
    $keyConn = new PDO("mysql:host=$serverName;dbname=$userKey", $adminName, $adminPassword);
}
catch (PDOException $ex) {
    header('HTTP/1.1 520 Server Connection Error', true,520);
    die();
}

//Удаляем тип расходов
try {
    $removeExpType = "DELETE FROM expenses_data
                    WHERE id=$expId";
    $keyConn->exec($removeExpType);
}
catch (PDOException $ex) {
    header('HTTP/1.1 500 Mysql Error', true,500);
    die();
}

//Удаляем все упоминания этого типа (в строках)
try {
    //Получаем id строк Журнала
    $getJournalIds = "SELECT id from journal";
    $journalIdsRes = $keyConn->query($getJournalIds);
    //Удаляем расходы этого типа в Журнале
    if($journalIdsRes) {
        $journalIdsNum = $journalIdsRes->rowCount();
        $c = 0;
        while($c < $journalIdsNum) {
            $curId = $journalIdsRes->fetch()['id'];
            $expTableName = "expenses_journal_$curId";
            $keyConn->exec("DELETE FROM $expTableName WHERE expense_id=$expId");
            $c++;
        }
    }

    //Получаем id строк Доходов
    $getIncomesIds = "SELECT id from incomes";
    $incomesIdsRes = $keyConn->query($getIncomesIds);
    //Удаляем расходы этого типа в Доходах
    if($incomesIdsRes) {
        $incomesIdsNum = $incomesIdsRes->rowCount();
        $c = 0;
        while($c < $incomesIdsNum) {
            $curId = $incomesIdsRes->fetch()['id'];
            $expTableName = "expenses_incomes_$curId";
            $keyConn->exec("DELETE FROM $expTableName WHERE expense_id=$expId");
            $c++;
        }
    }
}
catch (PDOException $ex) {
    header('HTTP/1.1 500 Mysql Error', true,500);
    die();
}

$keyConn = null;