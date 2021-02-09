<?php

include './globals.php';
use globals\Globals;

$serverName = Globals::$serverName;
$adminName = Globals::$adminName;
$adminPassword = Globals::$pass;

$userKey = $_POST['key'];
$rowId = $_POST['row_id'];
$rawMatUsageOfRow = json_decode($_POST['raw-mat-usage'], true); //данные об использовании сырья этим рядом
if(count($rawMatUsageOfRow) === 0) {
    $rawMatUsageOfRow = [];
    $rawMatUsed = [];
    $usedRawMatTotal = 0;
}
else {
    $rawMatUsed = $rawMatUsageOfRow['raw_mat_used'];
    $usedRawMatTotal = $rawMatUsageOfRow['raw_mat_used_total'];
}

try {
    $keyConn = new PDO("mysql:host=$serverName;dbname=$userKey", $adminName, $adminPassword);
}
catch (PDOException $ex) {
    header('HTTP/1.1 520 Server Connection Error', true,520);
    die();
}

$expensesTableName = "expenses_incomes_$rowId";
$getExpenses = "SELECT * FROM $expensesTableName";
$expensesRes = $keyConn->query($getExpenses);
if($expensesRes) {
    $expensesIdsCount = $expensesRes->rowCount();
    $c = 0;
    $usageIncomesRowsNum = count($rawMatUsed);

    //проходим по расходам и чистим их в журнал
    while ($c < $expensesIdsCount) {
        $curExpenseRow = $expensesRes->fetch();
        $curExpenseId = $curExpenseRow['expense_id'];
        $curExpenseSum = $curExpenseRow['sum'];

        //вычесть из нужных строк журнала суммы расходов _______________
        foreach ($rawMatUsed as $i => $usage_obj) {
            $used = $usage_obj['used'];
            $journal_id = $usage_obj['journal_id'];
            $curUsageCoef = $used / $usedRawMatTotal;
            $curExpenseSumPart = $curExpenseSum * $curUsageCoef;
            //echo "$curExpenseSumPart\n";
            //вычитаем эту сумму из соответствующих расходов журнала
            $journalExpensesTable = "expenses_journal_$journal_id";
            $substractFromJournalExp = "UPDATE $journalExpensesTable
                                                    SET sum=sum-$curExpenseSumPart 
                                                    WHERE expense_id=$curExpenseId";
            $keyConn->exec($substractFromJournalExp);
        }
        unset($journal_id, $used);

        $c++;
    }

    //Очищаем таблицу с расходами этой строки Доходов
    $removeIncomesExpenses = "TRUNCATE TABLE $expensesTableName";
    $keyConn->exec($removeIncomesExpenses);
}
$keyConn = null;