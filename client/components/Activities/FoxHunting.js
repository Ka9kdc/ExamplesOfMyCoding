import React from 'react';

const FoxHunting = () => {
  return (
    <div
      className="Isolated"
      style={{ color: 'darkgreen', backgroundColor: '#E0FFE0' }}
    >
      <div className="Announcement">Saturday Night Fox Hunting</div>
      <div>
        <p>
          <b>Fox Hunting</b> is a just-for-fun activity in which the "hunters"
          use radio direction finding (RDF) techniques to locate a transmitter
          within a fixed geographical boundary.
        </p>

        <p>
          Hunters gather about a half hour before the hunt. Everyone is invited
          to participate or ride along (call in advance). All hunts start at
          8PM.
        </p>
      </div>
      <table>
        <tbody>
          <tr>
            <th>Saturday</th>
            <th>Start Location</th>
            <th>Frequency</th>
          </tr>
          <tr>
            <td>1st</td>
            <td>KMart Parking lot, Elmhurst, Rt 83 north of St Charles Rd</td>
            <td>CFAR 147.750 MHz</td>
          </tr>
          <tr>
            <td>2nd</td>
            <td>
              Downers Grove Golf Club parking lot, Belmont Rd south of Odgen Ave
            </td>
            <td>Simplex 146.565 MHz</td>
          </tr>
          <tr>
            <td>3rd</td>
            <td>
              Centennial Park, Addison, Rohlwing Rd, 0.4 miles south of Lake St
            </td>
            <td>CFMC 146.160 MHz</td>
          </tr>
          <tr>
            <td>4th</td>
            <td>WoodDale Rd between Thorndale and Irving Pk Rd</td>
            <td>Simplex 146.34 MHz</td>
          </tr>
        </tbody>
      </table>

      <p>For further info contact Mike WA9FTS or call (708) 457-0966.</p>
    </div>
  );
};

export default FoxHunting;
