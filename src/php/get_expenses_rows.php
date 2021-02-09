<?php

include './globals.php';
use globals\Globals;

$serverName = Globals::$serverName;
$adminName = Globals::$adminName;
$adminPassword = Globals::$pass;

$userKey = $_POST['key'];

try {
    $keyConn = new PDO("mysql:host=$serverName;dbname=$userKey", $adminName, $adminPassword);
}
catch (PDOException $ex) {
    header('HTTP/1.1 520 Server Connection Error', true,520);
    die();
}

//Получаем строки расходов
try {
    $getExpensesRows = "SELECT * FROM expenses";
    $rowsRes = $keyConn->query($getExpensesRows);

    //Возвращаем пустой json объект, если таблица пустая
    if(!$rowsRes || $rowsRes->rowCount() == 0) {
        header('Content-Type: application/json', true);
        echo json_encode([]);
        die();
    }
    $rowsNum = $rowsRes->rowCount();

    //Загружаем строки в ассоциативный массив ____________

    $expensesRows = [];
    $rowCounter = 0;

    while($rowCounter < $rowsNum) {
        $rowCounter++;
        $curRow = [];
        $curResRow = $rowsRes->fetch();
        $curRowId = $curResRow['id'];

        //Загружам в строку данные
        foreach ($curResRow as $key => $value) {
            if($key === 'id' || gettype($key) === 'integer') {
                continue;
            }
            $curRow[$key] = $value;
        }
        unset($key, $value);

        $expensesRows[$curRowId] = $curRow;
    }

    header('Content-Type: application/json; charset=UTF-8', true);
    echo json_encode($expensesRows);
}
catch(Exception $ex) {
    header('HTTP/1.1 500 Mysql error', true,500);
    die();
}


$keyConn = null;