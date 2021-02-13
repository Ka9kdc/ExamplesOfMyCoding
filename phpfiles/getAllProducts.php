<?php 

$productsQuery = "SELECT * FROM products";

include 'db_ConnConfig.php';

$db_Conn = pg_connect( "$host $port $dbname" ) or die('Could not connet:' . pg_last_error());

$result = pg_query($db_Conn, $productsQuery);
$productsList = pg_fetch_all($result);
 
echo json_encode($productsList);

pg_close($db_Conn)

?>