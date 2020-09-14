import React from 'react';
import {connect} from 'react-redux'
import { updateMemberInfo } from '../../redux/membership';

//this page is done for now

const Badge = (props) => {
    return (
        <div>
        <div>Year licensed: <input name="LicenseYear" type="number" onChange={props.handleChange}/></div>
        <div>Badge name: <input name="badgeName" placeholder="Name" type="text" onChange={props.handleChange} /></div>
        <div>
            <div><input type="checkbox" name='ArrlLogo' onChange={props.updateLogo} /> ARRL logo  </div>
            <div><input type="radio" name="badgeType" value="Notch" onChange={props.handleChange}/> Notch &nbsp;
                <input type="radio" name="badgeType"  value="Magnet"  onChange={props.handleChange}/> Magnet </div>
            <div><input type="radio" name="badgeType"  value="Lanyard" onChange={props.handleChange} /> Lanyard &nbsp;
            <input type="radio" name="badgeType" value="Pin" onChange={props.handleChange}/> Pin</div>
            <div>
                {props.badgeType === "Lanyard" ? <div>Color: <select name="Color" onChange={props.handleChange}>
                    <option value="">Choose-A-Color</option>
                    <option value="White">White</option>
                    <option value="Black">Black</option>
                    <option value="Green">Green</option>
                    <option value="Brown">Brown</option>
                    <option value="Red">Red</option>
                    <option value="Blue">Blue</option>
                    <option value="Red White and Blue">Red, White & Blue</option>
                </select>
                </div>
                : '' }
            </div>
        </div>
    </div>
    )
}

const mapState = state => {
    return {
        badge: state.member.badge
    }
}

const mapDispatch = dispatch => {
    return {
        updateLogo: () => dispatch(updateMemberInfo({ArrlLogo: !this.props.badge.ArrlLogo})),
        handleChange: (event) => dispatch(updateMemberInfo({badge: {[event.target.name]: event.target.value}})),
    }
}

export default connect(mapState, mapDispatch)(Badge)