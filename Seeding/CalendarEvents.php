<?php 

$create_Calendar = "CREATE TABLE IF NOT EXISTS Calendar (
    id SERIAL PRIMARY KEY,
    event_name varchar(255) NOT NULL,
    event_start timestamptz,
    event_end timestamptz,
    event_location varchar(255) NOT NULL,
    event_description varchar(255),
    event_type varchar(255) DEFAULT 'Other'
    )";

$next_sunday_net_start = strtotime("Sunday 8:00 PM");
$next_weather_start = strtotime('Second Tuesday of this month 7:00 pm');
$this_month_ClubMeeting_start = strtotime("first friday of this month 7:30PM");
$this_month_HamfestMeeting_start = strtotime("second thursday of this month 7:30PM");
$this_month_BoardMeeting_start = strtotime("third thursday of this month 7:30PM");
$calendar_events = array();

for($x = 0; $x < 8; $x++){
    //Makes  8 weekly club nets
    $sql = "INSERT INTO Calendar (event_name, event_start, event_end, event_location, event_type) VALUES ('Weekly Club Net', '" . date("Y-m-d H:i:s", strtotime("+" . $x ." week", $next_sunday_net_start)) . "', '" . date("Y-m-d H:i:s", strtotime("+" . $x ." week +15 minutes", $next_sunday_net_start)) . "', '145.310', 'Net')";
    if ($x % 2){
        // makes 4 biweekly weather net
        $sql2 = "INSERT INTO Calendar (event_name, event_start, event_end, event_location, event_type) VALUES ('Weather Net', '" . date("Y-m-d H:i:s", strtotime("+" . $x ." week", $next_weather_start)) . "', '" . date("Y-m-d H:i:s", strtotime("+" . $x ." week +15 minutes", $next_weather_start)) . "', '444.475', 'Net')";
        // Makes 4 monthly meetings
        $month_count = $x / 2;
        $sql3 = "INSERT INTO Calendar (event_name, event_start, event_end, event_location, event_type) VALUES ('Monthly Club Meeting', '" . date("Y-m-d H:i:s", strtotime("+" . $month_count ." week", $this_month_ClubMeeting_start)) . "', '" . date("Y-m-d H:i:s", strtotime("+" . $month_count ." week +2 hours", $this_month_ClubMeeting_start)) . "', 'Zoom', 'Meeting')";
        $sql4 = "INSERT INTO Calendar (event_name, event_start, event_end, event_location, event_type) VALUES ('Monthly Hamfest Meeting', '" . date("Y-m-d H:i:s", strtotime("+" . $month_count ." week", $this_month_HamfestMeeting_start)) . "', '" . date("Y-m-d H:i:s", strtotime("+" . $month_count ." week +1 hours", $this_month_HamfestMeeting_start)) . "', 'Zoom', 'Meeting')";
        $sql5 = "INSERT INTO Calendar (event_name, event_start, event_end, event_location, event_type) VALUES ('Monthly Board Meeting', '" . date("Y-m-d H:i:s", strtotime("+" . $month_count ." week", $this_month_BoardMeeting_start)) . "', '" . date("Y-m-d H:i:s", strtotime("+" . $month_count ." week +1 hours", $this_month_BoardMeeting_start)) . "', 'Zoom', 'Meeting')";

        array_push($calendar_events, $sql, $sql2, $sql3, $sql4, $sql5);
    } else {
        array_push($calendar_events, $sql);
    }
}

if(pg_query($db_Conn, $create_Calendar)){
    for($y = 0; $y < sizeof($calendar_events); $y++){
        if(pg_query($db_Conn, $calendar_events[$y])) {
            echo "New event_ created successfully;  ";
        } else {
            echo "Error" . $calendar_events[$y] . "<br>" . pg_last_error() . "\n";
        }   
    }
} else {
    echo "Error" . $create_Calendar . "<br>" . pg_last_error() . "\n";
}

?>

