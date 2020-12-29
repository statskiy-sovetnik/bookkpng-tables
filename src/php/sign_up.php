<?php
    $serverName = '127.0.0.1:3310';
    $initialDb = 'origindb';
    $adminName = 'mmmNice';
    $adminPassword = '123098Phpadmin';
    $passwordAlgo = 'sha256';

    $userKey = $_POST['key'];
    $userEmail = $_POST['email'];
    $userPass = $_POST['password'];

    try {
        $initConn = new PDO("mysql:host=$serverName;dbname=$initialDb", $adminName, $adminPassword);
    }
    catch (PDOException $ex) {
        header('HTTP/1.1 520 Server Connection Error', true, 520);
        die();
    }

    //Проверка существования БД с указанным ключом

    $userKeyDbNames = $initConn->query("SHOW DATABASES LIKE '$userKey'");
    $dbNamesRow = $userKeyDbNames->fetch();
    if($userKeyDbNames->rowCount() == 0) {
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
                date DATE,
                name VARCHAR(40) NOT NULL,
                provider_name VARCHAR(40),
                amount FLOAT NOT NULL,
                price FLOAT NOT NULL
            )";
        $keyConn->exec($createJournalTable);
    }
    catch(PDOException $ex) {
        header('HTTP/1.1 500 Mysql error', true, 500);
        die();
    }


    $initConn = null;
    $keyConn = null;


