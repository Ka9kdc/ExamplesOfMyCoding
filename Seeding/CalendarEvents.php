<?php 
// $drop_Calendar = "DROP TABLE Calendar";

// $create_Calendar = "CREATE TABLE IF NOT EXISTS Calendar (
//     eventName varchar(255) NOT NULL,
//     eventStart timestamp,
//     eventEnd timestamp,
//     eventLocation varchar(255) NOT NULL,
//     eventDescription varchar(255),
//     eventType varchar(255)
//     )";

$nextSundayNetStart = strtotime("Sunday 8:00 PM");
$nextWeatherStart = strtotime('Tuesday 7:00 pm');
$calendarEvents = array();

for($x = 0; $x < 8; $x++){
    $sql = "INSERT INTO Calendar (eventName, eventStart, eventEnd, EventLocation, EventType) VALUES ('Weekly Club Net', " . date("Y-m-d H:i:s", strtotime("+" . $x ." week", $nextSundayNetStart)) . ", " . date("Y-m-d H:i:s", strtotime("+" . $x ." week +15 minutes", $nextSundayNetStart)) . ", '444.475', 'Net')";
    if ($x % 2){
        $sql2 = "INSERT INTO Calendar (eventName, eventStart, eventEnd, EventLocation, EventType) VALUES ('Weather Net', " . date("Y-m-d H:i:s", strtotime("+" . $x ." week", $nextWeatherStart)) . ", " . date("Y-m-d H:i:s", strtotime("+" . $x ." week +15 minutes", $nextWeatherStart)) . ", '444.475', 'Net')";
        array_push($calendarEvents, $sql, $sql2);
    } else {
        array_push($calendarEvents, $sql);
    }
}

?>

