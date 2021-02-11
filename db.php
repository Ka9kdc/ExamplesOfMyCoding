<?php
$host = "host = localhost";
$post = "port = 5432";
$dbname = "dbname = WCRA_test";

$db = pg_connect( "$host $port $dbname" );
if(!$db) {
    echo "Error :  unable to open database \n";
} else {
    echo "Opened database successfully\n";
}

pg_close($db);
?>