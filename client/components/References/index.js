import React from 'react'
import ArrlReferences from './ArrlReferences'
import LocalClubs from './LocalClubs'
import Manufactures from './Manufactures'
import OnlineTesting from './OnlineTesting'

const References = props => {
    return (
        <div className="body_container">
            <ArrlReferences />
            <LocalClubs />
            <OnlineTesting />
            <Manufactures />
        </div>
    )
}

export default References