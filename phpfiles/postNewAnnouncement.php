<?php
include 'db_ConnConfig.php';

$db_Conn = pg_connect( "$host $port $dbname" ) or die('Could not connet:' . pg_last_error());

$new_data = json_decode(file_get_contents('php://input'), false);
echo $new_data;

$new_post_query = "INSERT INTO Announcements (border_color, background_color, announcement_message, post_date) VALUES ('" . $new_data->borderColor .  "', '" . $new_data->sbackgroundColor .  "', '" . $new_data->message .  "', '" . date("Y-m-d H:i:s") . "')";

$result = pg_query($db_Conn, $new_post_query);
$new_post_record = pg_fetch_row($result);

echo json_encode($new_post_record);

pg_close($db_Conn)

?>