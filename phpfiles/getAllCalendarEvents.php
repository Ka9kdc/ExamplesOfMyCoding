<?php

$calendarQuery = "SELECT * FROM Calendar";

$host = "host = localhost";
$port = "port = 5432";
$dbname = "dbname = WCRA_test";

$dbConn = pg_connect( "$host $port $dbname" ) or die('Could not connet:' . pg_last_error());

$result = pg_query($dbConn, $calendarQuery);
$calendarList = pg_fetch_all($result);
 
echo json_encode($calendarList);

pg_close($dbConn)

?>