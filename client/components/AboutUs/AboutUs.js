import React from 'react'
import { Link } from 'react-router-dom'
import AddressBlock from './addressblock'

const AboutUs = props => {
    return (
        <div>
            <div className="Title">About WCRA</div>

<div className="Content">

<h1>Purpose</h1>

<p>
Per Article II as recorded in our Articles of Incorporation, WCRA has the
following purposes:
</p>

<ol>
  <li>
    To further the interests of Amateur Radio through active participation
    therein.
  </li>
  <li>To improve radio proficiency</li>
  <li>To develop better public relations</li>
  <li>To prepare for any communications emergencies.</li>
  <li>To aid in the training and development of future Radio Amateurs.</li>
</ol>

<p>
Based on the above, WCRA should not be considered a "repeater club;" however,
WCRA currently maintains <Link to="/Repeaters">several repeaters</Link>.
</p>

<h1>Activities</h1>

<h2>Meetings</h2>

<p>
WCRA meetings are normally held on the first Friday of the month at 7:30 PM at
First Presbyterian Church of Wheaton, 715 N Carlton St, Wheaton, IL. From time
to time it is necessary to adjust either the date or specific room location for
the meetings due to other activities and holidays, so it is advisable to check
our web site, or listen in on our <Link to="/Repeaters">nets</Link> to confirm
when and where the meetings will be. Visitors are always welcome to attend
meetings.
</p>

<h2>ARRL Field Day</h2>

<p>
WCRA participates in the <Link to="http://www.arrl.org/field-day">ARRL Field
Day</Link> event held in late June. Gasoline generators are typically used for
electrical power for the weekend event. Club members may put a station on the
air for the event, but this must be coordinated through the <Link to="/ContactUs">Field Day Committee</Link>. Visitors and persons interested
in Amateur Radio are invited and encouraged to come out and see what the fun of
Field Day is all about!
</p>

<h2>Amateur Radio License Classes</h2>

<p>
WCRA conducts <a href="Training.html">classes</a> for individuals interested in
obtaining an amateur radio license.
</p>

<h2>Volunteer Examiner Exams</h2>

<p>
Examinations for amateur radio licenses are given throughout the year by WCRA
Volunteer Examiners.
</p>

<h2>Public Service Events</h2>

<p>
WCRA club members provide communication support to a number of area <a href="Events.html">public service events</a> during the year. Supported
events include walkathons, bikeathons, various parades, etc.
</p>

<h2>Emergency Services Support</h2>

<p>
WCRA club members are active in local and area wide amateur radio emergency
service <Link to="http://www.arrl.org/ares">(ARES)</Link> activities. Emergency service activities include supporting the <Link to="http://www.nws.noaa.gov">National Weather Service</Link>.
</p>

<h2>Social Events</h2>

<p>
Several of our members get together from time to time for breakfast or lunch.
Please check the Hamletter for gathering information. This is a nice gathering
of some of our folks. Stop by and see us some time!
</p>

<h2>Hamfest</h2>

<p>
WCRA hosts a <a href="Hamfest.html">Hamfest</a> every January. This is a ham
radio, computer and hobby electronics flea market during which we host a variety
of educational forums about Ham Radio. Visitors and persons interested in
Amateur Radio are invited and encouraged to come out.
</p>

<h1>Membership</h1>

<p>
<b>Full WCRA membership</b> is open to all licensed radio amateurs in good
standing with the FCC and with the club. <b>Associate membership</b> is
available to persons who, while not currently holding a valid Amateur Radio
License, are interested in supporting and promoting the purposes and activities
of the club.
</p>

<p>
To join WCRA club as a new member visit the <Link to="/Membership">Join
WCRA</Link> page and choose a membership application form. New full membership
applicants must attach a photocopy of your current Amateur Radio license.
{/* do new members still need to do this? */}
(Renewing members need not do this.) Please include the appropriate dues in U.S.
funds via check or money order. Mail the completed package to the address shown
below.
</p>

<h2>Dues</h2>

<p>
Annual dues for a <b>Individual</b> WCRA membership is $26.00. <b>Family
memberships</b> (for multiple family members living in the same household) are
$39.00 annually. <b>Full time students</b> and <b>senior citizens</b> dues are
$13.00 per year. Dues are payable in full at the beginning of each calendar
year (January 1).
</p>

<p>
If there are any questions on joining the club, please contact a <Link to="/ContactUs">club officer.</Link>
</p>

<h1>About the Club's Makeup</h1>

<p>
The <b>Wheaton Community Radio Amateurs</b> is a not-for-profit corporation
organized under the Illinois Not For Profit Corporation Act of 1986. The club
has existed since its founding in 1948, but current records show that the club
was not incorporated until June 14th, 1984. The club is currently classified by
the United States Internal Revenue Service as a hobby club as defined in section
501(c)7 of the Internal Revenue Code. Under current laws at the time of this
writing, gifts and/or donations to our club are <b>NOT</b> tax deductible.
</p>

<p>
There are five club officers, who also act as the board of directors for the
corporation. Our current officers are listed on the <Link to="/ContactUs">Contact Us</Link> page.
</p>

<p>
If you are interested in further information or in seeing copies of our current
Articles of Incorporation, please contact a <Link to="/ContactUs">club officer</Link> to arrange this. Read our <Link to="/Bylaws">bylaws</Link> to see how the club is run. 
</p>

<h1>Mailing Address</h1>
<AddressBlock />

</div>
        </div>
    )
}

export default AboutUs