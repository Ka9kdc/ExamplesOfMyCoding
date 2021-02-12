<?php 

$attendees_table = "CREATE TABLE IF NOT EXISTS attendees (
    fullName varchar(255) NOT NULL,
    callsign varchar(6),
    phone varchar(10),
    street varchar(255),
    city varchar(255),
    st varchar(2),
    zip int,
    email varchar(255) NOT NULL,
    orderDate timestamptz NOT NULL,
    vendor boolean,
    company varchar(255),
    specialRequests text
)";

$Hamfest_orders_table = "CREATE TABLE IF NOT EXISTS Hamfest_orders (
    tickets int NOT NULL,
    tables int,
    chairs int,
    electrical boolean,
    raffle int,
    amount int NOT NULL,
    orderDate timestamptz NOT NULL,
    orderforPerson varchar(255),
    orderForCompany varchar(255)
)";

// $membertype = "CREATE TYPE IF NOT EXISTS member_type AS ENUM ('Full', 'Senior', 'Student', 'Family', 'Associate', 'Lifetime')";
// $validColors = "CREATE TYPE IF NOT EXISTS valid_colors AS ENUM ('Red',
// 'White',
// 'Black',
// 'Blue',
// 'Green',
// 'Red, White and Blue',
// 'Brown',
// '')";
// $badgestyles = "CREATE TYPE IF NOT EXISTS valid_styles AS ENUM ('NoPreference', 'Lanyard', 'Pin', 'Magnet', 'Notch')";
// $field_types = array($membertype, $validColors, $badgestyles)

$member_table = "CREATE TABLE IF NOT EXISTS members (
    firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL,
    callsign varchar(6) NOT NULL,
    phone varchar(10) NOT NULL,
    street varchar(255) NOT NULL,
    city varchar(255) NOT NULL,
    st varchar(2) NOT NULL,
    zip int NOT NULL,
    membershipType member_type,
    email varchar(255) NOT NULL,
    renewalDate timestamptz NOT NULL,
    newMember boolean,
    DueYear int NOT NULL,
    badgeName varchar(255),
    arrl boolean,
    color valid_colors,
    badgeStyle valid_styles,
    licenseYear int,
    Hamfest boolean,
  FieldDay boolean,
  PublicService boolean,
  MembershipCommittee boolean,
  Publicity boolean,
  Fundraising boolean,
  MeetingPrograms boolean,
  ClubOfficer boolean,
  HamLetter boolean,
  Website boolean,
  csuTrailer boolean,
  Repeaters boolean,
  Net boolean,
  Training boolean,
  YouthPrograms boolean,
  VEtesting boolean,
  other varchar(255)
)";

$payment_table = "CREATE TABLE IF NOT EXISTS payment (
    amount int NOT NULL,
    paymentDate timestamptz NOT NULL,
    hamfestPayment boolean,
    payeeName varchar(255)
)";

$tables_to_make = array($attendees_table, $Hamfest_orders_table, $member_table, $payment_table);

for($x = 0; $x < sizeof($tables_to_make); $x++){
    if(pg_query($dbConn, $tables_to_make[$x])){
        echo "table created:  ";
    } else {
        echo "Error" . $tables_to_make[$x] . "<br>" . pg_last_error() . "\n";
    }
}

?>