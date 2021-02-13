<?php 
$calendarQuery = "SELECT * FROM Calendar WHERE event_type = 'special event_' OR event_start BETWEEN '" . date("Y-m-d H:i:s") . "' AND '" . date("Y-m-d H:i:s", strtotime("+1 month")). "' ORDER BY event_start ASC";

include 'db_ConnConfig.php';

$db_Conn = pg_connect( "$host $port $dbname" ) or die('Could not connet:' . pg_last_error());

$result = pg_query($db_Conn, $calendarQuery);
$calendarList = pg_fetch_all($result);
 
echo json_encode($calendarList);

pg_close($db_Conn)

?>