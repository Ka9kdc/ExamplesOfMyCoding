<?php 
$drop_Calendar = "DROP TABLE Calendar";

$create_Calendar = "CREATE TABLE IF NOT EXISTS Calendar (
    eventName varchar(255) NOT NULL,
    eventStart timestamptz,
    eventEnd timestamptz,
    eventLocation varchar(255) NOT NULL,
    eventDescription varchar(255),
    eventType varchar(255)
    )";

$nextSundayNetStart = strtotime("Sunday 8:00 PM");
$nextWeatherStart = strtotime('Second Tuesday of this month 7:00 pm');
$thismonthClubMeetingStart = strtotime("first friday of this month 7:30PM");
$thismonthHamfestMeetingStart = strtotime("second thursday of this month 7:30PM");
$thismonthBoardMeetingStart = strtotime("third thursday of this month 7:30PM");
$calendarEvents = array();

for($x = 0; $x < 8; $x++){
    //Makes  8 weekly club nets
    $sql = "INSERT INTO Calendar (eventName, eventStart, eventEnd, EventLocation, EventType) VALUES ('Weekly Club Net', '" . date("Y-m-d H:i:s", strtotime("+" . $x ." week", $nextSundayNetStart)) . "', '" . date("Y-m-d H:i:s", strtotime("+" . $x ." week +15 minutes", $nextSundayNetStart)) . "', '145.310', 'Net')";
    if ($x % 2){
        // makes 4 biweekly weather net
        $sql2 = "INSERT INTO Calendar (eventName, eventStart, eventEnd, EventLocation, EventType) VALUES ('Weather Net', '" . date("Y-m-d H:i:s", strtotime("+" . $x ." week", $nextWeatherStart)) . "', '" . date("Y-m-d H:i:s", strtotime("+" . $x ." week +15 minutes", $nextWeatherStart)) . "', '444.475', 'Net')";
        // Makes 4 monthly meetings
        $monthCount = $x / 2;
        $sql3 = "INSERT INTO Calendar (eventName, eventStart, eventEnd, EventLocation, EventType) VALUES ('Monthly Club Meeting', '" . date("Y-m-d H:i:s", strtotime("+" . $monthCount ." week", $thismonthClubMeetingStart)) . "', '" . date("Y-m-d H:i:s", strtotime("+" . $monthCount ." week +2 hours", $thismonthClubMeetingStart)) . "', 'Zoom', 'Meeting')";
        $sql4 = "INSERT INTO Calendar (eventName, eventStart, eventEnd, EventLocation, EventType) VALUES ('Monthly Hamfest Meeting', '" . date("Y-m-d H:i:s", strtotime("+" . $monthCount ." week", $thismonthHamfestMeetingStart)) . "', '" . date("Y-m-d H:i:s", strtotime("+" . $monthCount ." week +1 hours", $thismonthHamfestMeetingStart)) . "', 'Zoom', 'Meeting')";
        $sql5 = "INSERT INTO Calendar (eventName, eventStart, eventEnd, EventLocation, EventType) VALUES ('Monthly Board Meeting', '" . date("Y-m-d H:i:s", strtotime("+" . $monthCount ." week", $thismonthBoardMeetingStart)) . "', '" . date("Y-m-d H:i:s", strtotime("+" . $monthCount ." week +1 hours", $thismonthBoardMeetingStart)) . "', 'Zoom', 'Meeting')";

        array_push($calendarEvents, $sql, $sql2, $sql3, $sql4, $sql5);
    } else {
        array_push($calendarEvents, $sql);
    }
}

$host = "host = localhost";
$port = "port = 5432";
$dbname = "dbname = WCRA_test";

$dbConn = pg_connect( "$host $port $dbname" ) or die('Could not connet:' . pg_last_error());

pg_query($dbConn, $drop_Calendar);
if(pg_query($dbConn, $create_Calendar)){
    for($y = 0; $y < sizeof($calendarEvents); $y++){
        if(pg_query($dbConn, $calendarEvents[$y])) {
            echo "New Event created successfully \n";
        } else {
            echo "Error" . $calendarEvents[$y] . "<br>" . pg_last_error() . "\n";
        }   
    }
} else {
    echo "Error" . $create_Calendar . "<br>" . pg_last_error() . "\n";
}

pg_close($dbConn)
?>

