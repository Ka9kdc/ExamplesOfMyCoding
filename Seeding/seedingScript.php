<?php
$host = "host = localhost";
$port = "port = 5432";
$dbname = "dbname = WCRA_test";

$dbConn = pg_connect( "$host $port $dbname" ) or die('Could not connet:' . pg_last_error());

$dropPoducts = "DROP TABLE Products";
pg_query($dbConn, $dropPoducts);
$dropUsers = "DROP TABLE Users";
pg_query($dbConn, $dropUsers);
$drop_Calendar = "DROP TABLE Calendar";
pg_query($dbConn, $drop_Calendar);

include 'calendarEvents.php';
include 'ProductsSeed.php';
include 'UserSeed.php';

echo "tables dropped - remove before production \n";

pg_close($dbConn);

?>