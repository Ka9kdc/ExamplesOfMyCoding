<?php 

$historyQuery = "SELECT * FROM Officer_History ORDER BY start_year DESC";

require('db_ConnConfig.php');

$db_Conn = pg_connect( "$host $port $dbname" ) or die('Could not connet:' . pg_last_error());

$result = pg_query($db_Conn, $historyQuery);
$historyList = pg_fetch_all($result);
 
echo json_encode($historyList);

pg_close($db_Conn);
?>