import React from 'react'

const OfficerYear = props => {
    const officer = props.officer
    return (
        <tr>
        <td>{officer.startYear}-{officer.endYear}</td>
        <td>{officer.President}</td>
        <td>{officer.VicePresident}</td>
        <td>{officer.Secretary}</td>
        <td>{officer.Treasurer}</td>
        <td>{officer.Custodian}</td>
        </tr>
    )
}

export default OfficerYear