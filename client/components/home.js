import React from 'react'
import { connect } from 'react-redux'
import { fetchLastAnnouncement } from '../redux/announcements'
import { makePost } from './News'

class Home extends React.Component {
    componentDidMount(){
        this.props.getNews()
    }
    render() {
        if(this.props.lastestNews.PostDate){
            console.log(this.props.lastestNews)
            const lastestNews = makePost(this.props.lastestNews)
            const newsHolder = document.getElementById('newsHolder')
            newsHolder.prepend(lastestNews)
        }
        return (
            <div>
                <div id='newsHolder'></div>
            </div>
        )
    }
}

const mapState = state => {
    return {
        lastestNews: state.lastestNews
    }
}

const mapDispatch = dispatch => {
    return {
        getNews: () => dispatch(fetchLastAnnouncement())
    }
}

export default connect(mapState, mapDispatch)(Home)