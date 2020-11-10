import React from 'react'
import { connect } from 'react-redux'
import { fetchAllAnnouncement } from '../redux/announcements'


export const makePost = (announcement) => {
    const post = document.createElement('div')
    post.innerHTML = announcement.message
    post.style.borderColor = announcement.borderColor
    post.style.backgroundColor = announcement.backgroundColor
    post.className = 'NewsItem'
    return post
}
class News extends React.Component {
    componentDidMount(){
        this.props.getNewsFeed()
    }
    render() {
        if(this.props.Announcements && this.props.Announcements.length){
            const feed = document.getElementById('feed')
            this.props.Announcements.map(announcement => {
               const newPost = makePost(announcement)
                feed.prepend(newPost)
            })
        }
        return <div id='feed'></div>
       
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