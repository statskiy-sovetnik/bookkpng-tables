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

//Получаем строки журнала

try {
    $getJournalRows = "SELECT * FROM journal ORDER BY id";
    $rowsRes = $keyConn->query($getJournalRows);

    //Возвращаем пустой json объект, если таблица пустая
    if(!$rowsRes || $rowsRes->rowCount() == 0) {
        header('Content-Type: application/json', true);
        echo json_encode([]);
        die();
    }
    $rowsNum = $rowsRes->rowCount();

    //Загружаем строки в ассоциативный массив ____________

    $journalRows = [];
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

        //Получаем данные о расходах
        $getRowExpenses = "SELECT * FROM expenses_journal_$curRowId";
        $rowExpensesRes = $keyConn->query($getRowExpenses);

        //Загружаем в строку данные о расходах

        $curRow['expenses'] = [];
        if($rowExpensesRes && $rowExpensesRes->rowCount() > 0) {

            $curRowExpensesCount = $rowExpensesRes->rowCount();
            $c = 0;

            while($c < $curRowExpensesCount) {
                $curExpenseResRow = $rowExpensesRes->fetch();
                $curExpensesRow = [];
                $curExpensesRow['id'] = $curExpenseResRow['expense_id'];
                $curExpensesRow['amount'] = $curExpenseResRow['sum'];

                //загружаем в строку
                $curRow['expenses'][$c] = $curExpensesRow;
                $c++;
            }
        }

        //загружаем строку
        $journalRows[$curRowId] = $curRow;
    }

    header('Content-Type: application/json; charset=UTF-8', true);
    echo json_encode($journalRows);
}
catch(Exception $ex) {
    header('HTTP/1.1 500 Mysql error', true,500);
    die();
}

$keyConn = null;
