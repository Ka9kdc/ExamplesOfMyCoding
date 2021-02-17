<?php

require('db_ConnConfig.php');

$db_Conn = pg_connect( "$host $port $dbname" ) or die('Could not connet:' . pg_last_error());

$new_data = json_decode(file_get_contents('php://input'), false);
echo $new_data;

$first_name = $new_data->FirstName;
$last_name = $new_data->LastName;
$callsign = $new_data->Callsign;
$phone = $new_data->Phone;
$street = $new_data->Street;
$city = $new_data->City;
$st = $new_data->State;
$zip = $new_data->Zip;
$membership_type = $new_data->Membership;
$email = $new_data->Email;
$renewal_date = $new_data->RenewalDate || date("Y-m-d H:i:s");
$new_member = $new_data->Desired;
$due_year = $new_data->DueYear;
$badge_name = $new_data->badgeName;
$arrl = $new_data->ArrlLogo;
$color = $new_data->Color;
$badge_style = $new_data->badgeType;
$license_year = $new_data->LicenseYear;
$Hamfest = $new_data->Hamfest;
$field_day = $new_data->FieldDay;
$public_Service = $new_data->PublicService;
$membership_committee = $new_data->MembershipCommittee;
$publicity = $new_data->Publicity;
$fundraising = $new_data->Fundraising;
$meeting_programs = $new_data->MeetingPrograms;
$club_officer = $new_data->ClubOfficer;
$ham_letter = $new_data->HamLetter;
$Website = $new_data->Website;
$csu_trailer = $new_data->csuTrailer;
$Repeaters = $new_data->Repeaters;
$Net = $new_data->Nets;
$Training = $new_data->Training;
$youth_programs = $new_data->YouthPrograms;
$ve_testing = $new_data->VEtesting;
$other = $new_data->other;

$new_member_insert_query = "INSERT INTO Membership 
(first_name, last_name, callsign, phone, street, city, st, zip, membership_type, email, renewal_date, new_member, due_year , badge_name, arrl, color valid_colors, badge_style valid_styles, license_year, Hamfest, field_day, public_Service, membership_committee, publicity, fundraising, meeting_programs, club_officer, ham_letter, Website, csu_trailer, Repeaters, Net, Training, youthPrograms, ve_testing, other) 
VALUES 
({$first_name}, {$last_name}, {$callsign}, {$phone}, {$street}, {$city}, {$st}, {$zip}, {$membership_type}, {$email}, {$renewal_date}, {$new_member}, {$due_year }, {$badge_name}, {$arrl}, {$color}, {$badge_style}, {$license_year}, {$Hamfest}, {$field_day}, {$public_Service}, {$membership_committee}, {$publicity}, {$fundraising}, {$meeting_programs}, {$club_officer}, {$ham_letter}, {$Website}, {$csu_trailer}, {$Repeaters}, {$Net}, {$Training}, {$youth_programs}, {$ve_testing}, {$other})"; 

$result = pq_query($db_Conn, $new_member_insert_query);
$new_member_data = pg_fetch_row($result);

echo $new_member_data;

include 'emailMemberConfirmation.php';

pg_close($db_Conn);

?>