<?php 
$sqlDrop = "DROP TABLE Products";

$sqlProductTable = "CREATE TABLE IF NOT EXISTS Products (product_name varchar(255), price integer, product_description varchar(255), photo varchar(255), onSale boolean)";

$product1 = "INSERT INTO Products (product_name, price, product_description, photo, onSale) VALUES ('Table', 25, 'An 8 foot by 4 foot folding table.', '/Images/download.jpeg', TRUE)";
$product2 = "INSERT INTO Products (product_name, price, product_description, photo, onSale) VALUES ('Ticket', 8, 'Entree Ticket with 4 raffle studs. Day off tickets come with only 1 stud and will be $10.', '/Images/f89b7cbe4e61a04129304e6ce498afb2.png', true)";
$product3 = "INSERT INTO Products (product_name, price, product_description, photo, onSale) VALUES ('Chair', 2, 'A metal folding chair. One chair is provided with each Vendor request.', '/Images/folding-chair-garden-furniture-stainless-steel-chair.jpg', false)";
$product4 = "INSERT INTO Products (product_name, price, product_description, photo, onSale) VALUES ('Electric', 15, 'An Electric drop', '/Images/electricOutlet.png', false)";
$products = array($product1, $product2, $product3, $product4);

pg_query($dbConn, $sqlDrop);
if(pg_query($dbConn, $sqlProductTable)) {
    for($x = 0; $x < 4; $x++){
        if(pg_query($dbConn, $products[$x])) {
            echo "New product created successfully \n";
        } else {
            echo "Error" . $products[$x] . "<br>" . pg_last_error() . "\n";
        }
    }
} else {
    echo "Error" . $sqlProductTable . "<br>" . pg_last_error() . "\n";
}


?>