import React from 'react';
import { connect } from 'react-redux';
import OfficerYear from './OfficerYear';
import { getOfficerHistory } from '../../redux/OfficerHistory';

class OfficerHistory extends React.Component {
  componentDidMount() {
    this.props.getHistory();
  }

  render() {
    return (
      <div>
        <div className="Title">Past Officers/Executive Boards</div>

        <div className="Content">
          <table className="Chrono">
            <tbody>
              <tr>
                <th>Years</th>
                <th>President</th>
                <th>Vice President</th>
                <th>Secretary</th>
                <th>Treasurer</th>
                <th>Custodian</th>
              </tr>
              {this.props.officers &&
                this.props.officers.map((officer) => (
                  <OfficerYear officer={officer} key={officer.id} />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    officers: state.officerHistory,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getHistory: () => dispatch(getOfficerHistory()),
  };
};

export default connect(mapState, mapDispatch)(OfficerHistory);
