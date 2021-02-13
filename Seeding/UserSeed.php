<?php 

$create_Users = "CREATE TABLE IF NOT EXISTS Users (
    id SERIAL PRIMARY KEY,
    username varchar(255) NOT NULL,
    callsign varchar(6),
    user_password varchar(255) NOT NULL,
    email varchar(255),
    salt varchar(255),
    exec_board boolean
    )";

$sql = "INSERT INTO Users (username, callsign, user_password, email, exec_board) VALUES ('cody', 'k9dog', 'test', 'cody@testing.com', TRUE)";

if(pg_query($db_Conn, $create_Users)){
    if(pg_query($db_Conn, $sql)){
        echo "users seeded \n";
    } else {
        echo "Error" . pg_last_error() . "\n";
    }
} else {
    echo "Error" . pg_last_error() . "\n";
}


?>