import React from 'react';

const TextApplication = (props) => {
  return (
    <div id="textApplication">
      <img alt="" className="Left" src="Images/LittleLogo.png" />

      <div style={{ textAlign: 'center', marginTop: '1em' }}>
        <div style={{ fontSize: '1.2em' }}>Membership Application/Renewal</div>
        <hr />
        <div style={{ fontSize: '1.5em' }}>
          Wheaton Community Radio Amateurs
        </div>
        <div style={{ fontSize: '0.8em' }}>
          P.O. Box 1055 &#8226; Wheaton, IL 60187-1055 &#8226; (630) 923-5447
        </div>
        <div style={{ fontSize: '0.8em' }}>
          wcra@w9ccu.org &#8226; www.w9ccu.org
        </div>
      </div>

      <div
        className="Right"
        style={{ border: '2px solid black', margin: '2em 0 0 0', padding: '0' }}
      >
        <div
          style={{
            width: '100%',
            margin: '0',
            padding: '0',
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: 'black',
          }}
        >
          &nbsp;Office Use Only
        </div>
        <div style={{ paddingLeft: '0.3em' }}>Cash $____</div>
        <div style={{ padding: '0 0.3em 0.3em 0.3em' }}>Chk# ____ $____</div>
      </div>

      <div style={{ marginTop: '2em' }}>
        Dues Year: _______ &nbsp; Today: _______________
      </div>

      <table>
        <tbody>
          <tr>
            <td>
              <input type="checkbox" /> Full Membership $26
            </td>
            <td style={{ paddingLeft: '3em' }}>
              <input type="checkbox" /> Student/Sr Citizen $13
            </td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" /> Lifetime Member $0
            </td>
            <td style={{ paddingLeft: '3em' }}>
              <input type="checkbox" /> Associate (no license) $13
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <input type="checkbox" /> Family/household $39
      </div>
      <div>
        <input type="checkbox" /> Family member of _____________________ $0
      </div>

      <hr
        style={{
          margin: '1em 0',
          height: '2px',
          backgroundColor: 'black',
          border: '0',
        }}
      />

      <div
        className="Right"
        style={{ border: 'solid 2px black', width: '18em', fontSize: '10pt' }}
      >
        <div>
          <input type="checkbox" /> Club Badge{' '}
        </div>
        <div>Year licensed: _________</div>
        <div>Badge name:</div>
        <div style={{ paddingTop: '0.5em' }}>________________________</div>
        <div style={{ lineHeight: '0.8em' }}>
          <div>
            <input type="checkbox" /> ARRL logo &nbsp;
            <input type="checkbox" /> Pin{' '}
          </div>
          <div>
            <input type="checkbox" /> Notch &nbsp;
            <input type="checkbox" /> Magnet{' '}
          </div>
          <div>
            <input type="checkbox" /> Lanyard{' '}
          </div>
          <div style={{ paddingLeft: '2em' }}>
            <div>Color:</div>
            <table>
              <tbody>
                <tr>
                  <td>
                    <input type="checkbox" /> white
                  </td>
                  <td>
                    <input type="checkbox" /> black
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="checkbox" /> green
                  </td>
                  <td>
                    <input type="checkbox" /> brown
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="checkbox" /> red
                  </td>
                  <td>
                    <input type="checkbox" /> blue
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <input type="checkbox" /> red, white & blue
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div style={{ lineHeight: '20pt' }}>
        <div>Callsign: ________</div>
        <div>Name: __________________________</div>
        <div>Address: ________________________</div>
        <div>City: ___________________________</div>
        <div>State: ______ Zip: ____________</div>
        <div>Home phone: ____________________</div>
        <div>Work phone: _____________________</div>
        <div>Cell phone: ______________________</div>
        <div>Email: __________________________</div>
      </div>

      <div style={{ marginTop: '1em', fontWeight: 'bold', fontSize: '1.2em' }}>
        Member Privacy Preferences
      </div>

      <p style={{ fontSize: '10pt' }}>
        I grant to the Wheaton Community Radio Amateurs and its representatives
        and transferees the right to use specified references to myself as
        indicated on this form. Where indicated with a checkmark, I{' '}
        <b>withold</b> authorization from Wheaton Community Radio Amateurs, et
        al, to copyright, use and publish the same in print and/or
        electronically. Checked items withhold permission for the dues year
        shown above.
      </p>

      <div
        className="Right"
        style={{
          border: '2px solid black',
          margin: '0 0 0 1em',
          padding: '0.2em',
        }}
      >
        <div style={{ fontWeight: 'bold', textAlign: 'center' }}>
          <div>Request</div>
          <div>Privacy</div>
        </div>
        <div>
          <input type="checkbox" /> Photographs
        </div>
        <div>
          <input type="checkbox" /> Videos
        </div>
        <div>
          <input type="checkbox" /> Name
        </div>
      </div>

      <p style={{ fontSize: '10pt' }}>
        I agree that Wheaton Community Radio Amateurs may use such content of me
        with or without my name and for any lawful purpose, including but not
        limited to publicity, illustration, advertising, and web content,
        published in the calendar "dues year" as shown above.
      </p>

      <div>Signature ___________________________________________</div>

      <hr
        style={{
          margin: '1em 0',
          height: '2px',
          backgroundColor: 'black',
          border: '0',
        }}
      />

      <div style={{ fontSize: '12pt' }}>
        Please indicate areas where you would like to assist or serve on a
        committee:
      </div>

      <table
        style={{
          fontSize: '10pt',
          margin: '0.5em 0 0 0',
          padding: '0',
          borderSpacing: '0',
          borderCollapse: 'collapse',
        }}
      >
        <tbody>
          <tr>
            <td>
              <input type="checkbox" /> Repeater Advisory Board
            </td>
            <td>
              <input type="checkbox" /> Meeting Programs
            </td>
            <td>
              <input type="checkbox" /> Club Officer
            </td>
            <td>
              <input type="checkbox" /> Membership
            </td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" /> Public Service Events
            </td>
            <td>
              <input type="checkbox" /> Field Day (June)
            </td>
            <td>
              <input type="checkbox" /> Fundraising
            </td>
            <td>
              <input type="checkbox" /> VE Testing
            </td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" /> Training/Elmering
            </td>
            <td>
              <input type="checkbox" /> On-Air Networks
            </td>
            <td>
              <input type="checkbox" /> CSU Trailer
            </td>
            <td>
              <input type="checkbox" /> Publicity
            </td>
          </tr>
          <tr>
            <td>
              <input type="checkbox" /> Hamfest (January)
            </td>
            <td>
              <input type="checkbox" /> Youth Programs
            </td>
            <td>
              <input type="checkbox" /> Newsletter
            </td>
            <td>
              <input type="checkbox" /> Web site
            </td>
          </tr>
          <tr>
            <td colSpan="4">
              <input type="checkbox" /> Other: ____________________________
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TextApplication;
