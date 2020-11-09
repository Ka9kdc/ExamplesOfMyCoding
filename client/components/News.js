import React from 'react'
import { connect } from 'react-redux'
import { fetchAllAnnouncement } from '../redux/announcements'

class News extends React.Component {
    componentDidMount(){
        this.props.getNewsFeed()
    }
    render() {
        if(this.props.Announcements && this.props.Announcements.length){
            return this.props.Announcements.map(announcement => {
                return (
                    <div style={{borderColor: `${announcement.borderColor}`, backgroundColor: `${announcement.backgroundColor}`}}>{announcement.message}</div>
                )
            })
        } else {
            return <div> Loading </div>
        }
    }
}

const mapState = state => {
    return {
        Announcements: state.newsHistory
    }
}

const mapDispatch = dispatch => {
    return {
        getNewsFeed: () => dispatch(fetchAllAnnouncement())
    }
}

export default connect(mapState, mapDispatch)(News)