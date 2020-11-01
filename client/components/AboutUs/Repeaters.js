import React from 'react'

const Repeaters = props => {
    return (
        <div>
            <div className="Title">WCRA Radio Repeaters</div>

<div className="Content">

<p>
Wheaton Community Radio Amateurs, with coordination approval from the Illinois
Repeater Association and adjacent state coordination, operates the following
<b>Yaesu Fusion C4FM </b> repeaters:
</p>

<table>
<tbody>
<tr>
  <th>Frequency (MHz)</th>
  <th>PL Tone (Hz)</th>
  <th>Mode</th>
</tr>
<tr>
  <td>145.310/144.710</td>
  <td>107.2 (1B) PL Encode/Decode</td>
  <td>Auto In/Auto Out</td>
</tr>
<tr>
  <td>145.390/144.790</td>
  <td>107.2 (1B) PL Encode/Decode</td>
  <td>Auto In/Auto Out  *OFF THE AIR INDEFINITELY*</td>
</tr>
<tr>
  <td>224.140/222.540</td>
  <td>110.9 (2Z) PL Encode/Decode</td>
  <td>NON Digital</td>
</tr>
<tr>
  <td>444.475/449.475</td>
  <td>114.8 (2A) PL Encode/Decode</td>
  <td>Auto In/Auto Out</td>
</tr>
</tbody>
</table>

<h1>On-Air Nets</h1>

<h2>Net Schedule</h2>

<table className="Nets">
<tbody>
<tr>
<th>Day</th>
<th>Time</th>
<th>Frequency</th>
<th>Net Control</th>
</tr>
<tr>
<td>Sunday</td>
<td>8:00pm</td>
<td>145.310</td>
<td style={{paddingLeft: '1em'}}>Rotates</td>
</tr>
<td>Tuesday (2nd & 4th)</td>
<td>7:00pm</td>
<td>444.475</td>
<td>Weather Net</td>
<tr>
<td style={{paddingLeft: '1em'}}></td>
</tr>
<tr>
</tr>
</tbody>
</table>
<p>
On those months that have a FIFTH Sunday, the WCRA VHF net will take place on the UHF repeater at 8pm.
</p>

<p>
We are constantly looking for folks to volunteer their time and talents to be
control operators for the nets. Feel free to volunteer on the active nets, or
contact our <a href="mailto:nets@w9ccu.org">Nets Coordinator</a>.
</p>

</div>
        </div>
    )
}

export default Repeaters