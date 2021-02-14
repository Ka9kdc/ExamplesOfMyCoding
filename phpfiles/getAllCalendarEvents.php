<?php

$calendarQuery = "SELECT * FROM Calendar";

require('db_ConnConfig.php');

$db_Conn = pg_connect( "$host $port $dbname" ) or die('Could not connet:' . pg_last_error());

$result = pg_query($db_Conn, $calendarQuery);
$calendarList = pg_fetch_all($result);
 
echo json_encode($calendarList);

pg_close($db_Conn);

?>