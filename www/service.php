<?php
include ('../includes/helpers.php');
$users_path = './data/users.csv';
$users = load_users();
$allow_methods = ['list', 'create'];
$method = $_GET['method'];
$fields = ['fname', 'lname', 'email', 'password'];
if(!in_array($method, $allow_methods)){
    exit(404);
}
//ob_start();
switch($method){
    case 'list':
        echo json_encode($users);
        break;
    case 'create':
        $user = array();
        foreach($fields as $field){
            $user[$field] = $_REQUEST[$field];
        }
        if(!filter_var($user['email'], FILTER_VALIDATE_EMAIL)) {
            echo json_encode(['errors'=>['email'=> 'Wrong email!']]);
            exit();
        }
        if(user_exist($user['email'])){
            echo json_encode(['errors'=>['email'=> 'User exists!']]);
            exit();
        }
        if($user['password'] != $_REQUEST['confirm_password']){
            echo json_encode(['errors'=>['password'=> 'Passwords don\'ot match']]);
            exit();
        }
        $users[$user['email']] = $user;
        save_users();
        $users = load_users();
        echo json_encode($users);
        break;
}
//ob_end_flush();
