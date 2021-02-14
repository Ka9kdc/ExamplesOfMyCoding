<?php
include 'db_ConnConfig.php';

$db_Conn = pg_connect( "$host $port $dbname" ) or die('Could not connet:' . pg_last_error());

$new_data = json_decode(file_get_contents('php://input'), false);
echo $new_data;

$new_event_query = "INSERT INTO Calendar (event_name, event_start, event_end, event_location, event_description, event_type) VALUES ('" . $new_data->name .  "', '" . $new_data->start .  "', '" . $new_data->end .  "', '" . $new_data->location .  "', '" . $new_data->description . "', '" . $new_data->type . "')";

$result = pg_query($db_Conn, $new_event_query);
$new_calendar_event = pg_fetch_row($result);

echo json_encode($new_calendar_event);

pg_close($db_Conn)

?>