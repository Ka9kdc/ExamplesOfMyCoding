<?php

$committees_responses = array($Hamfest, $field_day, $public_Service, $membership_committee, $publicity, $fundraising, $meeting_programs, $club_officer, $ham_letter, $Website, $csu_trailer, $Repeaters, $Net, $Training, $youth_programs, $ve_testing);
$committees_possible = array("Hamfest", "Field Day", "Public Service", "Membership Committee", "Publicity", "Fundraising", "Meeting Programs", "Club Officer", "Hamletter", "Website", "CSU", "RAB", "Net", "Training", "Youth Programs", "VE Testing");
$committeeInterest = array();
for($y = 0; $y < sizeof($committees_responses); $y++){
    if($committees_responses[$y]){
        array_push($committeeInterest, $committees_possible[$y]);
    }
} 
if($other) {
    array_push($committeeInterest, $other);
}

$email_message = "New Online Membership Renewal.\n\n";
$email_message .="Here is thier information:\n";
$email_message .="Type: {$membership_type}\n";
$email_message .="Name: {$first_name} {$last_name}\n";
$email_message .="Callsign: {$callsign}\n";
$email_message .="Email: {$email}\n";
$email_message .="Phone: {$phone}\n";
$email_message .="Address: {$street}\n";
$email_message .="{$city}, {$st} {$zip}\n";
$email_message .="Committee Interests: ";

$email_message2 = "Thank you for your WCRA Membership.\n\n";
$email_message2 .="Here is the infromation we will have on file for you:\n";
$email_message2 .="Type: {$membership_type}\n";
$email_message2 .="Name: {$first_name} {$last_name}\n";
$email_message2 .="Callsign: {$callsign}\n";
$email_message2 .="Email: {$email}\n";
$email_message2 .="Phone: {$phone}\n";
$email_message2 .="Address: {$street}\n";
$email_message2 .="{$city}, {$st} {$zip}\n";
$email_message .="Committee Interests: ";

if(sizeOf($committeeInterest) === 1){
    $email_message .="{$committeeInterest[0]}\n";
    $email_message2 .="{$committeeInterest[0]}\n";
} elseif (sizeOf($committeeInterest) < 1){
    for($x = 0; $x < sizeOf($committeeInterest); $x++){
        if($x+1 === sizeOf($committeeInterest)){
            $email_message .="and {$committeeInterest[$x]}\n";
            $email_message2 .="and {$committeeInterest[$x]}\n";
        } else{
            $email_message .="{$committeeInterest[$x]}, ";
            $email_message2 .="{$committeeInterest[$x]}, ";
        }
    }
} else {
    $email_message .="none\n";
    $email_message2 .="none\n";
}

if($new_member){
    $email_message .="\n NEW MEMBER \n\n";
    $email_message2 .="Thank you for Joining the WCRA! \n";
    $email_message2 .="As you are a new member you will have to be voted in at the next monthly club meeting.";
    $email_message2 .="The next WCRA meeting is ";
    if(strtolower('today') < strtotime("first friday of this month")){
        $email_message2 .="{date('Y-m-d', strtotime('first friday of this month'))}";
    } else {
        $email_message2 .="{date('Y-m-d', strtotime('first friday of next month'))}";
    }
    $email_message2 .="at 7:30 PM.\n";
    $email_message2 .="Once voted in a badge will be ordered for you.\n";
    $email_message2 .="Name on badge: {$badge_name}\n";
    $email_message2 .="Style of badge: {$badge_style}\n";
    if($badge_style === "Lanyard"){
        $email_message2 .="Lanyard Color: {$color}\n";
    }
    $email_message2 .="The year you were licensed: {$license_year}\n";
    if($arrl){
        $email_message2 .="Arrl Logo on badge: {$arrl}\n";
    }
}

$email_message2 .="If any of this information is wrong or changes please contact Ken at secretary@w9ccu.org. So he can update your information\n";
$email_message2 .="Thank you & '73\n";
$email_message2 .="WCRA Board\n";

// create email headers
$email_from = "secretary@w9ccu.org";
$headers = 'From: '.$email."\r\n".
'Reply-To: '.$email."\r\n" .
'X-Mailer: PHP/' . phpversion();
$headers2 = 'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'X-Mailer: PHP/' . phpversion();
mail($email_from, "Online Membership renewal", $email_message, $headers);
mail($email, "Online WCRA Membership Confirmation", $email_message2, $headers2);


?>