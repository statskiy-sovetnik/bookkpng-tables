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
$expensesUsage = json_decode($_POST['expenses-usage'], true);

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

//Добавляем данные об использовании расходов
try{
    //Берём последний id таблицы расходов
    $getLastExpTableId = "SELECT id FROM expenses ORDER BY id DESC LIMIT 1";
    $lastExpIdRes = $keyConn->query($getLastExpTableId);
    if($lastExpIdRes) {
        $lastExpId = $lastExpIdRes->fetch()['id'];

        $usageTableName = "expenses_usage_$lastExpId";
        //Создаём таблицу
        $createExpUsage = "CREATE TABLE $usageTableName(
                            incomes_id INT NOT NULL PRIMARY KEY,
                            sum FLOAT NOT NULL
                        )";
        $keyConn->exec($createExpUsage);
        //Добавляем данные об использовании
        foreach ($expensesUsage as $i => $usage_obj) {
            $curIncomesId = $usage_obj['incomes_id'];
            $curSum = $usage_obj['sum'];
            $addUsageData = "INSERT INTO $usageTableName(incomes_id, sum)
                        VALUES ('$curIncomesId', '$curSum')";
            $keyConn->exec($addUsageData);
        }
        unset($i, $usage_obj);
    }

}
catch(Exception $ex) {
    header('HTTP/1.1 500 Mysql Error', true,500);
}

$keyConn = null;

