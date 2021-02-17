<?php 

$attendees_table = "CREATE TABLE IF NOT EXISTS attendees (
    id SERIAL PRIMARY KEY,
    full_name varchar(255) NOT NULL,
    callsign varchar(6),
    phone varchar(10),
    street varchar(255),
    city varchar(255),
    st varchar(2),
    zip int,
    email varchar(255) NOT NULL,
    order_date timestamptz NOT NULL,
    vendor boolean,
    company varchar(255),
    special_Requests text
)";

$Hamfest_orders_table = "CREATE TABLE IF NOT EXISTS Hamfest_orders (
    id SERIAL PRIMARY KEY,
    tickets int NOT NULL,
    tables int,
    chairs int,
    electrical boolean,
    raffle int,
    amount int NOT NULL,
    order_date timestamptz NOT NULL,
    order_for_Person varchar(255),
    order_for_Company varchar(255)
)";

// $member_type = "CREATE _type IF NOT EXISTS member_type AS ENUM ('Full', 'Senior', 'Student', 'Family', 'Associate', 'Lifetime')";
// $validColors = "CREATE _type IF NOT EXISTS valid_colors AS ENUM ('Red',
// 'White',
// 'Black',
// 'Blue',
// 'Green',
// 'Red, White and Blue',
// 'Brown',
// '')";
// $badgestyles = "CREATE _type IF NOT EXISTS valid_styles AS ENUM ('NoPreference', 'Lanyard', 'Pin', 'Magnet', 'Notch')";
// $field_types = array($member_type, $validColors, $badgestyles)

$member_table = "CREATE TABLE IF NOT EXISTS members (
    id SERIAL PRIMARY KEY,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    callsign varchar(6) NOT NULL,
    phone varchar(10) NOT NULL,
    street varchar(255) NOT NULL,
    city varchar(255) NOT NULL,
    st varchar(2) NOT NULL,
    zip int NOT NULL,
    membership_type member_type DEFAULT 'Full',
    email varchar(255) NOT NULL,
    renewal_date timestamptz NOT NULL,
    new_member boolean,
    due_year int NOT NULL,
    badge_name varchar(255),
    arrl boolean,
    color valid_colors DEFAULT '',
    badge_style valid_styles DEFAULT 'NoPreference',
    license_year int,
    Hamfest boolean,
  field_day boolean,
  public_Service boolean,
  membership_committee boolean,
  publicity boolean,
  fundraising boolean,
  meeting_programs boolean,
  club_officer boolean,
  ham_letter boolean,
  Website boolean,
  csu_trailer boolean,
  Repeaters boolean,
  Net boolean,
  Training boolean,
  youthPrograms boolean,
  ve_testing boolean,
  other varchar(255)
)";

$payment_table = "CREATE TABLE IF NOT EXISTS payment (
    id SERIAL PRIMARY KEY,
    amount int NOT NULL,
    payment_date timestamptz NOT NULL,
    hamfest_payment boolean,
    payee_name varchar(255)
)";

$tables_to_make = array($attendees_table, $Hamfest_orders_table, $member_table, $payment_table);

for($x = 0; $x < sizeof($tables_to_make); $x++){
    if(pg_query($db_Conn, $tables_to_make[$x])){
        echo "table created:  ";
    } else {
        echo "Error" . $tables_to_make[$x] . "<br>" . pg_last_error() . "\n";
    }
}

?>