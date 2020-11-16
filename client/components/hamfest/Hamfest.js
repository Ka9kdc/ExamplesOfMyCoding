import React from 'react'
import {Link} from 'react-router-dom'
import Sponsors from './Sponsors'

const Hamfest = props => {
    return (
        <div>
        <div className="Title">WCRA 2021 Mid-Winter Hamfest - WILL BE GONE VIRTUAL</div>

<div className="Content">
<div className="Subtitle" style={{textAlign: "center"}}>Ham Radio, Computer, and Hobby Electronics Flea Market</div>

<img alt="" className="Right" src="Images/Hamfest2016.jpg" />
<div>January 17, 2021, 8AM to 1PM</div>
<h3>As many have been wondering, we will be cancelling the hamfest as an in-person activity. The Hamfest committee has been working on putting on a Virtual Hamfest instead, more details to come.</h3>
<div>
<h2>Features</h2>

<ul>
	<li>Ham Radio, Computer, Radio Control, and Hobby Electronics Vendors</li>
	<li>Educational Forums</li>
	{/* <li>Amateur Radio Exams 8am-11:30am</li> */}
	<li>General Admission Raffle</li>
	{/* <li>Food Vendor</li> */}
</ul>
</div>
<div>
<h2>Forums for the 2021 Hamfest</h2>
<ul><li>TBA</li></ul>
</div>
<div>
    <h2>General Admission</h2>
    <Link to="/HamfestStore">Purchase Tickets</Link>
</div>
<div>
<h1>Vendor Info</h1>
<p><a href='Document/2021Hamfest-VendorNotification.pdf'>Letter to vendors about our 2021 hamfest and how to participate</a>. If interested in participating, please contact the hamfest committee at <a href="mailto:hamfest@w9ccu.org">hamfest@w9ccu.org</a>.</p>
<Link to="/HamfestStore">Purchase Tables and Tickets</Link>
</div>
<Sponsors />
</div></div>
    )
}

export default Hamfest