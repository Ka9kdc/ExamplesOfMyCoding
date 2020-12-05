import React from 'react';
import { Link } from 'react-router-dom';
import AddressBlock from './addressblock';

const ContactUs = () => {
  return (
    <>
      <div className="Title">Contacting WCRA</div>

      <div className="Content">
        <>
          <h1>WCRA Officers</h1>

          <p>
            The following is the list of current WCRA officers. E-mail addresses
            and other contact information for the officers is available to the
            membership via the club roster.
          </p>

          <ul>
            <li>
              President -{' '}
              <a href="mailto:president@w9ccu.org">Scott DeSantis, KB9VRW</a>
            </li>
            <li>
              Vice President -{' '}
              <a href="mailto:vicepresident@w9ccu.org">John Cheney, N9MWF</a>
            </li>
            <li>
              Treasurer -{' '}
              <a href="mailto:treasurer@w9ccu.org">Carol Schroeder, KB9FYL</a>
            </li>
            <li>
              Secretary -{' '}
              <a href="mailto:secretary@w9ccu.org">Ken Kwasniewski, N9HQ</a>
            </li>
            <li>
              Custodian -{' '}
              <a href="mailto:custodian@w9ccu.org">Mike Wilson, N0MO</a>
            </li>
            <li>
              Email the Full Board at{' '}
              <a href="mailto:board@w9ccu.org">board@w9ccu.org</a>
            </li>
          </ul>

          <p>
            We also have a <Link to="/OfficerHistory">chronological list</Link>{' '}
            of WCRA club officers since 1948.
          </p>
        </>
        <>
          <h1>Committees</h1>

          <p>
            The following committees exist to support the operation and
            activities of the Wheaton Community Radio Amateurs. Please click on
            the committee name for additional information about the particular
            committee activity. If you are interested in participating in a
            particular committee, you can contact the chairperson or leader
            listed below.
          </p>

          <table className="Committees">
            <tbody>
              <tr>
                <th>Committee</th>
                <th>Chair/Members</th>
              </tr>
              <tr>
                <td>Field Day</td>
                <td>
                  <a href="mailto:field-day@w9ccu.org">Tim, KC9YFI</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="Hamletter.html">Hamletter</a>
                </td>
                <td>
                  <a href="mailto:info@W9ccu.org">Open</a>
                </td>
              </tr>
              <tr>
                <td>
                  <Link to="/Hamfest">Hamfest</Link>
                </td>
                <td>
                  <a href="mailto:hamfest@w9ccu.org">
                    Scott, KB9VRW <br /> Roger
                  </a>
                </td>
              </tr>
              <tr>
                <td>Net Coordinator</td>
                <td>
                  <a href="mailto:nets@w9ccu.org">Tim, KC9YFI</a>
                </td>
              </tr>
              <tr>
                <td>Programs</td>
                <td>
                  <a href="mailto:jwcheney@yahoo.com">John, N9MWF</a>
                </td>
              </tr>
              <tr>
                <td>Public Service</td>
                <td>
                  <a href="mailto:hamradion0mo@gmail.com">Mike W, N0MO</a>
                </td>
              </tr>
              <tr>
                <td>Public Relations</td>
                <td>
                  <a href="mailto:info@w9ccu.org">Open</a>
                </td>
              </tr>
              <tr>
                <td>Repeater Advisory Board (RAB)</td>
                <td>
                  <a href="mailto:airczar@me.com">Chairman: Don, N9NYX</a>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: 'center' }}>
                  <a href="mailto:rab@w9ccu.org">Email entire RAB</a>
                </td>
                <td>
                  <a href="mailto:weinda373@gmail.com">
                    Secretary: Dave, AB9VW
                  </a>
                  <br />
                  <a href="mailto:tomgeletka-wcra@yahoo.com">
                    Trustee: Tom, N9CBA
                  </a>
                  <br />
                  <a href="mailto:kc9yfi@yahoo.com">Member: Tim, KC9YFI</a>
                  <br />
                  <a>Open</a>
                </td>
              </tr>
              <tr>
                <td>
                  <Link to="/Training">Training and Education</Link>
                </td>
                <td>
                  <a href="mailto:info@w9ccu.org">Open</a>
                </td>
              </tr>
              <tr>
                <td>VE Testing</td>
                <td>
                  <a href="mailto:speterson@email.com">Steve, N9OA</a>
                </td>
              </tr>
              <tr>
                <td>Web site, online technical support</td>
                <td>
                  <a href="mailto:webmaster@w9ccu.org"> Kelsey, KA9KDC</a>
                </td>
              </tr>
            </tbody>
          </table>
        </>
        <>
          <h1>General Inquiries</h1>

          <p>
            General questions may be sent via email to{' '}
            <a href="mailto:info@w9ccu.org">info@w9ccu.org</a> or by postal mail
            to this address:
          </p>

          <AddressBlock />

          <p>
            We can be reached by phone at (630) 923-5447. Leave a message. We
            will return your call.
          </p>
        </>
      </div>
    </>
  );
};

export default ContactUs;
