<?php
$host = "host = localhost";
$port = "port = 5432";
$dbname = "dbname = WCRA_test";

$dbConn = pg_connect( "$host $port $dbname" ) or die('Could not connet:' . pg_last_error());

include 'calendarEvents.php';
include 'ProductsSeed.php';
include 'UserSeed.php';

pg_close($dbConn);

?>