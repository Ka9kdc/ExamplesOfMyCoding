<?php 

$createAnnouncementTable = "CREATE TABLE IF NOT EXISTS Announcement (
    borderColor varchar(25) NOT NULL,
    backgroundColor varchar(25) NOT NULL,
    announcementMessage  text NOT NULL,
    postDate date NOT NULL
)";

$newFeedHistory = array(
"INSERT INTO Announcement (borderColor, backgroundColor, announcementMessage, postDate) VALUES ('\#945b0a',   '\#e6c589', '\#In-person Meeting: October 2nd at 7:30pm

[September](hamletter/MeetingMinutes/2020_11_September_MeetingMinutes.pdf) meeting minutes are available online.

[Meeting Agenda](hamletter/MeetingMinutes/Agenda.pdf)

\#\#\# We are pleased to announce we will have in-person meetings . The meeting will occur at [Addison Fire Station \#2](https://goo.gl/maps/Gi6sB66FFEU5ynhh9) Training Room. The station is at 666 S. Vista in Addison.

The training room is accessed from the west side of the building. Please park in the area North of the Training Tower. (North side of the West parking lot)

We are also conducting the meeting via Zoom Live, so if you want to join that way please email Scott KB9VRW at [kb9vrw@gmail.com](mailto:kb9vrw@gmail.com) for information.

\#\#\# Social Distancing and snacks

The meeting will take place using proper social distancing. Proper masks will be used, except when making a presentation or drinking a beverage.

We will have cold beverages available but snacks will not be provided, please bring your own if you would like something to munch on.

\#\#\# Program

Parks on the Air presented by Mark Spoo N9VDQ

\#\#\# Please watch our website or [Facebook](https://www.facebook.com/groups/267873833946/?ref=bookmarks) page for further club news.',   '" . date("Y-m-d", strtotime("2020-8-15")) . "')"
    ,
"INSERT INTO Announcement (borderColor, backgroundColor, announcementMessage, postDate) VALUES ('\#53cfda',   '\#Eff2e6',   '\# In-person Meeting: September 11th at 7:30pm

[August](hamletter/MeetingMinutes/August_7_2020_Minutes.pdf) and [September](hamletter/MeetingMinutes/2020_11_September_MeetingMinutes.pdf) meeting minutes are available online.

\#\#\# We are pleased to announce we will have in-person meetings again. The meeting will occur at [Addison Fire Station \#2](https://goo.gl/maps/Gi6sB66FFEU5ynhh9) Training Room. The station is at 666 S. Vista in Addison.

The training room is accessed from the west side of the building. Please park in the area North of the Training Tower. (North side of the West parking lot)

We are also conducting the meeting via Zoom Live, so if you want to join that way please email Scott KB9VRW at [kb9vrw@gmail.com](mailto:kb9vrw@gmail.com) for information.

\#\#\# Social Distancing and snacks

The meeting will take place using proper social distancing. As such, there are a few changes the members should be aware of. Proper masks will also be used, except when making a presentation or drinking a beverage.

We will have cold beverages available but snacks will not be provided, please bring your own if you would like something to munch on.

\#\#\# Program

The program for the evening will be a discussion about the direction of the club and the proposed future activities. We will open the floor to questions and/or suggestion. So please bring you ideas.

\#\# Anchors

The following items are for sale. If you are interested in any of them, please contact [Mike Wilson](mailto:hamradion0mn@gmail.com) for more information.

*   Pyramid Gold Series 22 amp power supply
*   PAKRATT 232
*   MFJ Deluze Versa Tuner II
*   Icom IC-735
*   No power cable or microphone included. Tested and working.

\#\#\# Please watch our website or [Facebook](https://www.facebook.com/groups/267873833946/?ref=bookmarks) page for further club news.',   '" . date("Y-m-d", strtotime("2020-7-15")) . "')"
    ,
"INSERT INTO Announcement (borderColor, backgroundColor, announcementMessage, postDate) VALUES ('\#53cfda',   '\#Eff2e6',   '\# New WCRA Board

\#\# Congratulations to Scott DeSantis on being elected as the new WCRA club President.

By unanimous consent, the following members were elected and re-elected.

*   President - Scott DeSantis
*   Secretary - Ken Kwasniewski
*   Property Custodian - Michael Wilson


[August meeting minutes](hamletter/MeetingMinutes/August_7_2020_Minutes.pdf) are available online.

\#\# Next Meeting: September 11th

\#\#\# We are pleased to announce we will have in-person meetings again. These meetings will currently be held at [Addison Fire Station \#2](https://goo.gl/maps/Gi6sB66FFEU5ynhh9) on the first Friday of each month at 7:30 pm.

Please park in the area North of the Training Tower. (North side of the West parking lot)

For those of you who are unable to attend in-person or do not want to attend an in-person meeting in today health environment, we may be streaming the meeting via zoom. More information on this possibility will be posted as the meeting date appoaches.

\#\#\# Social Distancing and snacks

The meeting will take place using proper social distancing. As such, there are a few changes the members should be aware of. Proper masks should be worn, except when making a presentation or drinking a beverage.

We will have cold beverages available but snacks will not be provided, please bring your own if you would like something to munch on.

\#\# Anchors

The following items are for sale. If you are interested in any of them, please contact [Mike Wilson](mailto:hamradion0mn@gmail.com) for more information.

*   Pyramid Gold Series 22 amp power supply
*   PAKRATT 232
*   MFJ Deluze Versa Tuner II
*   Icom IC-735
*   No power cable or microphone included. Tested and working.

\#\#\# Please watch our website or [Facebook](https://www.facebook.com/groups/267873833946/?ref=bookmarks) page for further club news.',   '" . date("Y-m-d", strtotime("2020-7-8")) . "')");

if(pg_query($dbConn, $createAnnouncementTable)){
    for($y = 0; $y < sizeof($newFeedHistory); $y++){
        if(pg_query($dbConn, $newFeedHistory[$y])) {
            echo "New Event created successfully;  ";
        } else {
            echo "Error" . $newFeedHistory[$y] . "<br>" . pg_last_error() . "\n";
        }   
    }
} else {
    echo "Error" . $createAnnouncementTable . "<br>" . pg_last_error() . "\n";
}
?>