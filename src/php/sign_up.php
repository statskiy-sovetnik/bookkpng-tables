<?php

    include './globals.php';
    use globals\Globals;

    $serverName = Globals::$serverName;
    $initialDb = Globals::$initDb;
    $adminName = Globals::$adminName;
    $adminPassword = Globals::$pass;
    $passwordAlgo = 'sha256';

    $userKey = $_POST['key'];
    $userEmail = $_POST['email'];
    $userPass = $_POST['password'];

    try {
        $initConn = new PDO("mysql:host=$serverName;dbname=$initialDb", $adminName, $adminPassword);
    }
    catch (PDOException $ex) {
        header("HTTP/1.1 520 Sorry cannot connect to $initialDb \n $adminName \n $adminPassword",
            true, 520);
        die();
    }

    //Проверка существования БД с указанным ключом

    $userKeyDbNames = $initConn->query("SHOW DATABASES LIKE '$userKey'");
    if(!$userKeyDbNames || $userKeyDbNames->rowCount() == 0) {
        $initConn->exec("CREATE DATABASE $userKey");
    }
    else {
        header('HTTP/1.1 507 Db name conflict', true, 507);
        die();
    }

    //Добавление ключа в таблицу с аккаунтами

    try {
        $userPassHash = hash($passwordAlgo, $userPass);
        $sqlAddKey = "INSERT INTO accounts_data(password_hash, account_key)
                      VALUES ('$userPassHash', '$userKey')";
        $initConn->exec($sqlAddKey);
    }
    catch(PDOException $ex) {
        header('HTTP/1.1 500 Mysql error', true, 500);
        die();
    }

    //Создаем таблицу с пользователями ключа

    $keyConn = new PDO("mysql:host=$serverName;dbname=$userKey", $adminName, $adminPassword);
    $userPassHash = hash($passwordAlgo, $userPass);

    try {
        $createUsersTable = "CREATE TABLE db_users(
            email VARCHAR(30) NOT NULL PRIMARY KEY
        )";
        $keyConn->exec($createUsersTable);

        //Добавляем пользователя в таблицу

        $addNewUser = "INSERT INTO db_users (email) 
                       VALUES ('$userEmail')";
        $keyConn->exec($addNewUser);
    }
    catch(PDOException $ex) {
        header('HTTP/1.1 500 Mysql error', true, 500);
        die();
    }

    //Создаем таблицу журнала

    try {
        $createJournalTable = "CREATE TABLE journal(
                id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                raw_mat_id INT NOT NULL,
                date DATE NOT NULL,
                amount FLOAT NOT NULL
            )";
        $keyConn->exec($createJournalTable);
    }
    catch(PDOException $ex) {
        header('HTTP/1.1 500 Mysql error', true, 500);
        die();
    }

    //Создаем таблицу доходов

    try {
        $createIncomesTable = "CREATE TABLE incomes(
                    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                    date DATE NOT NULL,
                    name VARCHAR(40) NOT NULL,
                    customer_name VARCHAR(50),
                    amount FLOAT NOT NULL,
                    price FLOAT NOT NULL
                )";
        $keyConn->exec($createIncomesTable);
    }
    catch(PDOException $ex) {
        header('HTTP/1.1 500 Mysql error', true, 500);
        die();
    }

    //Создаем таблицу расходов
    try {
        $createExensesTable = "CREATE TABLE expenses(
                        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                        date DATE NOT NULL,
                        sum FLOAT NOT NULL,
                        expense_id INT NOT NULL
                    )";
        $keyConn->exec($createExensesTable);
    }
    catch(PDOException $ex) {
        header('HTTP/1.1 500 Mysql error', true, 500);
        die();
    }

    //Создаём таблицу данных с типами расходов expenses_data

    try {
        $createExpensesDataTable = "CREATE TABLE expenses_data(
                    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                    name VARCHAR(40) NOT NULL,
                    color VARCHAR(30) NOT NULL
                )";
        $keyConn->exec($createExpensesDataTable);
    }
    catch(PDOException $ex) {
        header('HTTP/1.1 500 Mysql error', true, 500);
        die();
    }

    //Создаём таблицу данных с сырьём raw_mat_data

    try {
        $createRawMatDataTable = "CREATE TABLE raw_mat_data(
                        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                        name VARCHAR(50) NOT NULL,
                        provider_name VARCHAR(50) NOT NULL,
                        price FLOAT NOT NULL
                    )";
        $keyConn->exec($createRawMatDataTable);
    }
    catch(PDOException $ex) {
        header('HTTP/1.1 500 Mysql error', true, 500);
        die();
    }

    $initConn = null;
    $keyConn = null;


