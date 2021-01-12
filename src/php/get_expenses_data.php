<?php

include './globals.php';
use globals\Globals;

$adminName = Globals::$adminName;
$pass = Globals::$pass;
$serverName = Globals::$serverName;
$userKey = $_POST['key'];

try {
    $keyConn = new PDO("mysql:host=$serverName; dbname=$userKey", $adminName, $pass);
}
catch(PDOException $ex) {
    header('HTTP/1.1 520 Server connection error', true, 520);
    die();
}

try {
    //Получаем данные о расходах
    $getExpensesData = "SELECT * FROM expenses_data";
    $expensesDataRes = $keyConn->query($getExpensesData);

    if(!$expensesDataRes || $expensesDataRes->rowCount() == 0) {
        header('Content-Type: application/json', true);
        echo json_encode([]);
        die();
    }

    //Загружаем данные о расходах в array
    $expensesCount = $expensesDataRes->rowCount();
    $c = 0;
    $expensesData = [];

    while($c < $expensesCount) {
        $curExpenseObj = [];
        $curExpenseRowRes = $expensesDataRes->fetch();
        $curExpenseObj['color'] = $curExpenseRowRes['color'];
        $curExpenseObj['name'] = $curExpenseRowRes['name'];
        $curExpenseId = $curExpenseRowRes['id'];

        $expensesData[$curExpenseId] = $curExpenseObj;
        $c++;
    }

    header('Content-Type: application/json; charset=UTF-8', true);
    echo json_encode($expensesData);
}
catch(Exception $ex) {
    header('HTTP/1.1 500 Mysql error', true, 500);
    die();
}


$keyConn = null;
