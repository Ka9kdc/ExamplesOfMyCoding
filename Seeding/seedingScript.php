<?php
$host = "host = localhost";
$port = "port = 5432";
$dbname = "dbname = WCRA_test";

$db_Conn = pg_connect( "$host $port $dbname" ) or die('Could not connet:' . pg_last_error());

// $dropPoducts = "DROP TABLE Products";
// pg_query($db_Conn, $dropPoducts);
// $dropUsers = "DROP TABLE Users";
// pg_query($db_Conn, $dropUsers);
// $drop_Calendar = "DROP TABLE Calendar";
// pg_query($db_Conn, $drop_Calendar);
// pg_query($db_Conn, "DROP TABLE Officer_History");
// pg_query($db_Conn, "DROP TABLE Announcement");
// echo "tables dropped - remove before production \n";

include 'calendarevents.php';
include 'ProductsSeed.php';
include 'UserSeed.php';
include "OfficerHistory.php";
include "NewsFeed.php";
include "MakeAllOtherEmtpyTables.php";

echo "done /n";

pg_close($db_Conn);

?>