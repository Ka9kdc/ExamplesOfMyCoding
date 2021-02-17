<?php 

$attendees_table = "CREATE TABLE IF NOT EXISTS attendees (
    id SERIAL PRIMARY KEY,
    full_name varchar(255) NOT NULL CHECK (full_name <> ''),
    callsign varchar(6),
    phone varchar(10),
    street varchar(255),
    city varchar(255),
    st varchar(2),
    zip int,
    email varchar(255) NOT NULL,
    order_date timestamptz NOT NULL CHECK (order_date <> ''),
    vendor boolean,
    company varchar(255),
    special_Requests text
)";

$Hamfest_orders_table = "CREATE TABLE IF NOT EXISTS Hamfest_orders (
    id SERIAL PRIMARY KEY,
    tickets int NOT NULL CHECK (tickets <> ''),
    tables int,
    chairs int,
    electrical boolean,
    raffle int,
    amount int NOT NULL,
    order_date timestamptz NOT NULL,
    order_for_Person varchar(255) CHECK (order_for_Person <> ''),
    order_for_Company varchar(255) CHECK (other_for_Company <> '')
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
    first_name varchar(255) NOT NULL CHECK (first_name <> ''),
    last_name varchar(255) NOT NULL CHECK (last_name <> ''),
    callsign varchar(6) NOT NULL CHECK (callsign <> ''),
    phone varchar(10) NOT NULL CHECK (phone <> ''),
    street varchar(255) NOT NULL CHECK (street <> ''),
    city varchar(255) NOT NULL CHECK (city <> ''),
    st varchar(2) NOT NULL CHECK (st <> ''),
    zip int NOT NULL CHECK (zip <> ''),
    membership_type member_type DEFAULT 'Full' CHECK (membership_type <> ''),
    email varchar(255) NOT NULL CHECK (email <> ''),
    renewal_date timestamptz NOT NULL CHECK (renewal_date <> ''),
    due_year int NOT NULL CHECK (due_year <> ''),
    new_member boolean,
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
  other varchar(255) CHECK (other <> '')
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