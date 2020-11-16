import React from 'react';
import { connect } from 'react-redux';
import { fetchAllVendors } from '../../redux/AllVendor';

class Sponsors extends React.Component {
  componentDidMount() {
    this.props.getSponsors();
  }
  render() {
    return (
      <div>
        <div className="Title">2021 Sponsors</div>
        <div style={{ paddingLeft: ' 1em', width: '95%' }}>
          <div className="row">
            {this.props.sponsors &&
              this.props.sponsors.map((sponsor) => (
                <div clasName="column">{sponsor.Name}</div>
              ))}
            <div className="column">Wheaton Community Radio Club</div>
            <div className="column">Various Other Vendors</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    sponsors: state.vendors,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getSponsors: () => dispatch(fetchAllVendors()),
  };
};

export default connect(mapState, mapDispatch)(Sponsors);
