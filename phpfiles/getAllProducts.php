<?php 

$productsQuery = "SELECT * FROM products";

$host = "host = localhost";
$port = "port = 5432";
$dbname = "dbname = WCRA_test";

$dbConn = pg_connect( "$host $port $dbname" ) or die('Could not connet:' . pg_last_error());

$result = pg_query($dbConn, $productsQuery);
$productsList = pg_fetch_all($result);
 
echo json_encode($productsList);

pg_close($dbConn)

?>