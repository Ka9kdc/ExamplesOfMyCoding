<?php 

$dropUsers = "DROP TABLE Users";

$create_Users = "CREATE TABLE IF NOT EXISTS Users (
    username varchar(255) NOT NULL,
    callsign varchar(6),
    userpassword varchar(255) NOT NULL,
    email varchar(255),
    salt varchar(255),
    execBoard boolean
    )";

$sql = "INSERT INTO Users (username, callsign, userpassword, email, execboard) VALUES ('cody', 'k9dog', 'test', 'cody@testing.com', TRUE)";

pg_query($dbConn, $dropUsers);
if(pg_query($dbConn, $create_Users)){
    if(pg_query($dbConn, $sql)){
        echo "user seeded \n";
    } else {
        echo "Error" . pg_last_error() . "\n";
    }
} else {
    echo "Error" . pg_last_error() . "\n";
}


?>