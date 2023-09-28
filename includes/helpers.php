<?php
function load_users()
{
    global $users_path;
    $array = [];
    if(file_exists($users_path)) {
        $rows = [];
        $handle = fopen($users_path, "r");
        while (($row = fgetcsv($handle)) !== false) {
            $rows[] = $row;
        }
        fclose($handle);
        $headers = array_shift($rows);
        foreach ($rows as $row) {
            $user = array_combine($headers, $row);
            $array[$user['email']] = $user;
        }
    }
    return $array;
}

function save_users()
{
    global $users_path, $users;
    $fp = fopen($users_path, 'w');
    $i = 0;
    foreach ($users as $email => $row) {
        //save headers
        if($i == 0){
            fputcsv($fp, array_keys($row));
            $i++;
        }
        //save each row
        fputcsv($fp, array_values($row));
    }
    fclose($fp);
}

function user_exist($email)
{
    global $users;
    return array_key_exists($email, $users);
}
