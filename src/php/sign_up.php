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

    //Создаем таблицу с пользователями ключа

    $keyConn = new PDO("mysql:host=$serverName;dbname=$userKey", $adminName, $adminPassword);
    $userPassHash = hash($passwordAlgo, $userPass);

    try {
        $createUsersTable = "CREATE TABLE db_users(
            email VARCHAR(30) NOT NULL PRIMARY KEY,
            pass_hash VARCHAR(64) NOT NULL 
        )";
        $keyConn->exec($createUsersTable);

        //Добавляем пользователя в таблицу

        $addNewUser = "INSERT INTO db_users (email, pass_hash) 
                       VALUES ('$userEmail', '$userPassHash')";
        $keyConn->exec($addNewUser);
    }
    catch(PDOException $ex) {
        header('HTTP/1.1 500 Mysql error', true, 500);
        die();
    }


    $initConn = null;
    $keyConn = null;


