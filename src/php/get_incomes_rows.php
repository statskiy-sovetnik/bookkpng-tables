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
    header('HTTP/1.1 520 Server connection error', true,520);
    die();
}


try {
    //Получаем строки таблицы доходов

    $getIncomesRows = "SELECT * from incomes";
    $incomesRowsRes = $keyConn->query($getIncomesRows);

    if(!$incomesRowsRes || $incomesRowsRes->rowCount() == 0) {
        header('Content-Type: application/json');
        echo json_encode([]);
        die();
    }

    //Обрабатываем строки
    $incomesRows = []; //общий объект, который будем возвращать
    $incomesRowsNum = $incomesRowsRes->rowCount();
    $c = 0;

    while($c < $incomesRowsNum) {
        $curIncomeRowRes = $incomesRowsRes->fetch();
        $curIncomeId = $curIncomeRowRes['id'];
        $curRowObj = [];

        //Проходим строку и добавляем данные в объект текущей строки
        foreach ($curIncomeRowRes as $key => $value) {
            if($key === 'id' || gettype($key) === 'integer') {
                continue;
            }

            $curRowObj[$key] = $value;
        }
        unset($key, $value);

        //Достаем данные о расходах текущей строки
        $getCurRowExpenses = "SELECT * from expenses_incomes_$curIncomeId";
        $curRowExpensesRes = $keyConn->query($getCurRowExpenses);
        $curRowExpensesArr = [];
        if($curRowExpensesRes && $curRowExpensesRes->rowCount() > 0) {

            //Проходим массив с расходами и добавляем данные в созданный массив
            $expensesCount = $curRowExpensesRes->rowCount();
            $i = 0;
            while($i < $expensesCount) {
                $expensesObj = [];
                $expensesObjRes = $curRowExpensesRes->fetch();
                $expensesObj['id'] = $expensesObjRes['expense_id'];
                $expensesObj['amount'] = $expensesObjRes['sum'];

                $curRowExpensesArr[$i] = $expensesObj;
                $i++;
            }
        }

        //Добавляем данные в общий объект
        $curRowObj['expenses'] = $curRowExpensesArr;
        $incomesRows[$curIncomeId] = $curRowObj;
        $c++;
    }

    header('Content-Type: application/json; charset=UTF-8', true);
    echo json_encode($incomesRows);
}
catch(Exception $ex) {
    header('HTTP/1.1 500 Mysql error', true,500);
}

$keyConn = null;