<?php

include './globals.php';
use globals\Globals;

$initDatabase = 'origindb';
$serverName = Globals::$serverName;
$adminName = Globals::$adminName;
$adminPassword = Globals::$pass;

$newRawMatName = $_POST['new-raw-mat-name'];
$newProviderName = $_POST['new-provider-name'];
$newRawMatPrice = $_POST['new-raw-mat-price'];
$rawMatId = $_POST['raw-mat-id'];
$entryDate = $_POST['raw_mat_date'];
$rawMatAmount = $_POST['raw-mat-amount'];
$userKey = $_POST['user-key'];
$expenses = json_decode($_POST['expenses'], true);

try {
    $initConn = new PDO("mysql:host=$serverName;dbname=$initDatabase", $adminName, $adminPassword);
}
catch (PDOException $ex) {
    header('HTTP/1.1 520 Server Connection Error', 520);
    die();
}

try {
    $keyConn = new PDO("mysql:host=$serverName;dbname=$userKey", $adminName, $adminPassword);
}
catch(PDOException $ex) {
    header('HTTP/1.1 520 Server connection error', 520);
    die();
}


try {
    //Если существующее сырье, то просто добавляем запись в журнал
    if($rawMatId !== 'null') {
        $addRow = "INSERT INTO journal(raw_mat_id, date, amount)
               VALUES ('$rawMatId', '$entryDate', '$rawMatAmount')";
        $keyConn->exec($addRow);
    }
    //если новое сырьё
    else {
        $getLastRawMatId = "SELECT id from raw_mat_data ORDER BY id DESC LIMIT 1";
        $res = $keyConn->query($getLastRawMatId);
        if($res->rowCount() == 0) {
            $newRawMatId = 1;
        }
        else {
            $lastId = $res->fetch()['id'];
            $newRawMatId = $lastId + 1;
        }
        //Добавляем строку в журнал
        $addRow = "INSERT INTO journal(raw_mat_id, date, amount)
                    VALUES ('$newRawMatId', '$entryDate', '$rawMatAmount')";
        $keyConn->exec($addRow);

        //Добавляем новое сырьё
        $addRawMat = "INSERT INTO raw_mat_data(name, provider_name, price)
                        VALUES ('$newRawMatName', '$newProviderName', '$newRawMatPrice')";
        $keyConn->exec($addRawMat);
    }

    //Создаем таблицу с расходами новой строки журнала
    $getLastJournalRowId = "SELECT id from journal ORDER BY id DESC LIMIT 1";
    $res = $keyConn->query($getLastJournalRowId);
    $lastJournalRowId = $res->fetch()['id'];

    $expTableName = "expenses_journal_$lastJournalRowId";
    $createExpensesTable = "CREATE TABLE $expTableName(
                                expense_id INT PRIMARY KEY NOT NULL,
                                sum FLOAT
                            )";
    $keyConn->exec($createExpensesTable);

    //Добавляем расходы:
    foreach ($expenses as $exp_id => $sum) {
        $addExpense = "INSERT INTO $expTableName(expense_id, sum)
                        VALUES ('$exp_id', '$sum')";
        $keyConn->exec($addExpense);
    }
    unset($sum, $exp_id);
}
catch (PDOException $ex) {
    header('HTTP/1.1 500 Mysql error', 500);
    die();
}

echo "Новое имя: $newRawMatName 
Новая цена: $newRawMatPrice 
Новый поставщик: $newProviderName
Id: $rawMatId
Дата: $entryDate 
Кол-во: $rawMatAmount
Ключ: $userKey
Последний id: $lastId
Расход: $expisnull";


$initConn = null;
$keyConn = null;
