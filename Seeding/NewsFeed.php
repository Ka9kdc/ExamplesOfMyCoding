<?php 
$nextWeek = 1;

$date = strtotime("Sunday 7:00 PM");
echo time();
echo "\n";
echo date("Y-m-d H:i:s", $date) . "\n";
echo date("Y-m-d H:i:s", strtotime("+1  week", $date)) . "\n";
$week = $nextWeek * 2;
echo date("Y-m-d H:i:s", strtotime("+" . $week ." week", $date)) . "\n";
echo date("Y-m-d H:i:s", strtotime("+" . $week ." week +15 minutes", $date)) . "\n";

$month = strtotime("first friday of this month 7PM");
echo date("Y-m-d H:i:s", $month);
echo "\n";
echo date("Y-m-d H:i:s", strtotime("+1 month", $month))
?>