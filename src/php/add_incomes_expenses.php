<?php

include './globals.php';
use globals\Globals;

$serverName = Globals::$serverName;
$adminName = Globals::$adminName;
$adminPassword = Globals::$pass;

$userKey = $_POST['key'];
$expenses = json_decode($_POST['expenses'], true);
$rowId = $_POST['row-id'];
$rawMatUsageObj = json_decode($_POST['raw-mat-usage-obj'], true);
$rawMatUsed = $rawMatUsageObj['raw_mat_used'];
$rawMatUsedTotal = $rawMatUsageObj['raw_mat_used_total'];

try {
    $keyConn = new PDO("mysql:host=$serverName;dbname=$userKey", $adminName, $adminPassword);
}
catch (PDOException $ex) {
    header('HTTP/1.1 520 Server Connection Error', true,520);
    die();
}

try {
    //Добавляем расходы в Доходы:
    $expTableName = "expenses_incomes_$rowId";
    if($expenses) {
        foreach ($expenses as $exp_id => $sum) {
            $addExpense = "INSERT INTO $expTableName(expense_id, sum)
                        VALUES ('$exp_id', '$sum') ON DUPLICATE KEY UPDATE sum=sum+$sum";
            $keyConn->exec($addExpense);

            //Добавляем расходы в Журнал
            $sum = $sum * 1;
            $rawMatUsedTotal = $rawMatUsedTotal * 1;

            $sumForKg = $sum / $rawMatUsedTotal;

            if(!$rawMatUsed) {
                continue;
            }
            foreach ($rawMatUsed as $i => $raw_mat_obj) {
                $curJournalId = $raw_mat_obj['journal_id'];
                $used = $raw_mat_obj['used'];
                $curExpTableName = "expenses_journal_$curJournalId";
                $curRawMatExpense = $used * $sumForKg;
                $addJournalExpenses = "INSERT INTO $curExpTableName(expense_id, sum)
                                VALUES ('$exp_id', '$curRawMatExpense') 
                                ON DUPLICATE KEY UPDATE sum=sum+$curRawMatExpense";
                $keyConn->exec($addJournalExpenses);
            }
            unset($i, $raw_mat_obj);
        }
        unset($sum, $exp_id);
    }
}
catch(Exception $ex) {
    header('HTTP/1.1 500 Mysql error', true,500);
    die();
}

