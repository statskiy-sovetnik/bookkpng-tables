<?php

include './globals.php';
use globals\Globals;

$initDatabase = 'origindb';
$serverName = Globals::$serverName;
$adminName = Globals::$adminName;
$adminPassword = Globals::$pass;

$rowsUsage = json_decode($_POST['rows_usage'], true);
$expenses = json_decode($_POST['expenses'], true);
$userKey = $_POST['user_key'];
$amount = $_POST['amount'];
$price = $_POST['price'];
$goodsName = $_POST['goods-name'];
$customerName = $_POST['customer-name'];
$date = $_POST['date'];

try {
    $keyConn = new PDO("mysql:host=$serverName;dbname=$userKey", $adminName, $adminPassword);
}
catch (PDOException $ex) {
    header('HTTP/1.1 520 Server Connection Error', true,520);
    die();
}

//Добавляем запись в incomes
try {
    $addIncomesRow = "INSERT INTO incomes(date, name, customer_name, amount, price)
                        VALUES ('$date', '$goodsName', '$customerName', '$amount', '$price')";
    $keyConn->exec($addIncomesRow);
    echo json_encode($keyConn->errorInfo());
}
catch(Exception $ex) {
    header('HTTP/1.1 Aborted adding an income row', true, 500);
    die();
}

//Создаем таблицу с расходами новой строки incomes
try {
    $getLastIncomesRowId = "SELECT id from incomes ORDER BY id DESC LIMIT 1";
    $res = $keyConn->query($getLastIncomesRowId); //не может быть пустым
    $lastIncomesRowId = $res->fetch()['id'];

    $expTableName = "expenses_incomes_$lastIncomesRowId";
    $createExpensesTable = "CREATE TABLE $expTableName(
                                expense_id INT PRIMARY KEY NOT NULL,
                                sum FLOAT
                            )";
    $keyConn->exec($createExpensesTable);
}
catch(Exception $ex) {
    header('HTTP/1.1 Unable to create expenses table', true, 500);
    die();
}

//Добавляем расходы
try {
    foreach ($expenses as $exp_id => $sum) {
        $addExpense = "INSERT INTO $expTableName(expense_id, sum)
                        VALUES ('$exp_id', '$sum')";
        $keyConn->exec($addExpense);
    }
    unset($sum, $exp_id);
}
catch(Exception $ex) {
    header('HTTP/1.1 Error while adding expenses', true, 500);
    die();
}

//Создаем таблицу с данными об использованном сырье текущей строки
try {
    $usageTableName = "raw_mat_usage_$lastIncomesRowId";
    $createUsageTable = "CREATE TABLE $usageTableName(
                            journal_id INT PRIMARY KEY NOT NULL,
                            used FLOAT NOT NULL
                        )";
    $keyConn->exec($createUsageTable);
}
catch(Exception $ex ) {
    header('HTTP/1.1 Error while creating a usage table', true, 500);
    die();
}

//Добавляем данные об использовании
try {
    foreach ($rowsUsage as $journal_id => $used) {
        $addUsageData = "INSERT INTO $usageTableName(journal_id, used)
                            VALUES ('$journal_id', '$used')";
        $keyConn->exec($addUsageData);
    }
    unset($journal_id, $used);
}
catch(Exception $ex ) {
    header('HTTP/1.1 Error while adding usage data', true, 500);
    die();
}

$keyConn = null;
