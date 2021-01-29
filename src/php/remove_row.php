<?php

include './globals.php';
use globals\Globals;

$initDatabase = Globals::$initDb;
$serverName = Globals::$serverName;
$adminName = Globals::$adminName;
$adminPassword = Globals::$pass;
$userKey = $_POST['key'];
$rowId = $_POST['row_id'];
$tableData = $_POST['data'];  //journal or incomes

try {
    $keyConn = new PDO("mysql:host=$serverName;dbname=$userKey", $adminName, $adminPassword);
}
catch (PDOException $ex) {
    header('HTTP/1.1 520 Server Connection Error', true,520);
    die();
}


try {
    $tableName = '';
    $expensesTableName = '';
    switch ($tableData) {
        case 'journal':
            $tableName = 'journal';
            $expensesTableName = "expenses_journal_$rowId";
            break;
        case 'incomes':
            $tableName = 'incomes';
            $expensesTableName = "expenses_incomes_$rowId";
            break;
        default:
            header('HTTP/1.1 Wrong table name 507', true, 507);
            die();
    }

    //Удаляем строку
    $removeRow = "DELETE FROM $tableName WHERE id='$rowId'";
    $keyConn->exec($removeRow);

    //Удаляем таблицу с расходами этой строки
    //но если мы удаляем строку Доходов, то сначала почистим расходы в Журнале
    if($tableData === 'incomes') {
        $getExpenses = "SELECT * FROM $expensesTableName";
        $expensesRes = $keyConn->query($getExpenses);
        if($expensesRes) {
            $expensesIdsCount = $expensesRes->rowCount();
            $c = 0;
            $usedRawMatTotal = 0;
            //берём соответсвующий raw_mat_usage
            $rawMatUsageTable = "raw_mat_usage_$rowId";
            //берём id строк журнала, из которых будем чистить расходы
            $getUsageIncomesData = "SELECT * FROM $rawMatUsageTable";
            $usageIncomesDataRes = $keyConn->query($getUsageIncomesData);
            if($usageIncomesDataRes) {
                $usageIncomesRowsNum = $usageIncomesDataRes->rowCount();
                //заполним массив id используемых строк журнала
                $usageIncomesDataAssoc = [];
                $i = 0;
                while($i < $usageIncomesRowsNum) {
                    $curUsageRow = $usageIncomesDataRes->fetch();
                    $curJournalId = $curUsageRow['journal_id'];
                    $usageIncomesDataAssoc[$curJournalId] = $curUsageRow['used'];
                    $usedRawMatTotal += $curUsageRow['used'];
                    $i++;
                }
                unset($i);

                //проходим по расходам и чистим их в журнале
                while($c < $expensesIdsCount) {
                    $curExpenseRow = $expensesRes->fetch();
                    $curExpenseId = $curExpenseRow['expense_id'];
                    $curExpenseSum = $curExpenseRow['sum'];

                    //вычесть из нужных строк журнала суммы расходов _______________
                    foreach ($usageIncomesDataAssoc as $journal_id => $used) {
                        $curUsageCoef = $used / $usedRawMatTotal;
                        $curExpenseSumPart = $curExpenseSum * $curUsageCoef;
                        echo "$curExpenseSumPart\n";
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
            }
            else {
                echo "I lost the table\n";
            }

        }
    }

    $removeExpenses = "DROP TABLE $expensesTableName";
    $keyConn->exec($removeExpenses);

    //Удаляем нужные raw_mat_usage
    switch ($tableData) {
        case 'journal':
            //Найдем все таблицы raw_mat_usage
            $getIncomesIds = "SELECT id from incomes";
            $incomesIdsRes = $keyConn->query($getIncomesIds);
            if(!$incomesIdsRes || $incomesIdsRes->rowCount() == 0) {
                break;
            }
            $incomesRowsCount = $incomesIdsRes->rowCount();
            $c = 0;

            while($c < $incomesRowsCount) {
                //Выбираем таблицу raw_mat_usage и удаляем из неё строку с удаляемым id журнала
                $curIncomeId = $incomesIdsRes->fetch()['id'];
                $curRawMatUsageTableName = "raw_mat_usage_$curIncomeId";
                $removeJournalRawMatUsage = "DELETE FROM $curRawMatUsageTableName
                                            WHERE journal_id='$rowId'";
                $keyConn->exec($removeJournalRawMatUsage);
                $c++;
            }

            break;
        case 'incomes':
            //удаляем таблицу raw_mat_usage
            $removeJournalRawMatUsage = "DROP TABLE raw_mat_usage_$rowId";
            $keyConn->exec($removeJournalRawMatUsage);
            break;

    }
}
catch (Exception $ex) {
    header('HTTP/1.1 Mysql error 500', true, 500);
}

$keyConn = null;