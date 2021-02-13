<?php

$announcementsQuery = "SELECT * FROM announcement ORDER BY post_date DESC LIMIT 1";

include 'db_ConnConfig.php';

$db_Conn = pg_connect( "$host $port $dbname" ) or die('Could not connet:' . pg_last_error());

$result = pg_query($db_Conn, $announcementsQuery);
$announcementsList = pg_fetch_all($result);
 
echo json_encode($announcementsList);

pg_close($db_Conn)

?>