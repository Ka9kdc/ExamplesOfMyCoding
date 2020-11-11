import React from 'react'
import { connect } from 'react-redux'
import { fetchLastAnnouncement } from '../../redux/announcements'
import { makePost } from '../singlepages/News'
import Agenda from './Agenda'

class Home extends React.Component {
    componentDidMount(){
        this.props.getNews()
    }
    render() {
        if(this.props.lastestNews.PostDate){
            const lastestNews = makePost(this.props.lastestNews)
            const newsHolder = document.getElementById('newsHolder')
            newsHolder.prepend(lastestNews)
        }
        return (
            <div>
                <div className="Title">WCRA's Home On The Web - W9CCU</div>

                <div className="Content">
                    <div id='newsHolder'></div>
                    <Agenda />
                    <div>
                    <h1>At First Glance</h1>

<p>
<b>Wheaton Community Radio Amateurs, Inc.</b> was founded in 1948. We are a
group of amateur radio operators who promote the advancement of the hobby and
science of amateur radio through
</p>

<ul>
<li>member participation in training and testing of new amateur operators;</li>
<li>providing local communications infrastructure via repeaters;</li>
<li>supporting local emergency services with secondary communications;</li>
<li>and offering communications support for many local charitable and social
  groups.</li>
</ul>

<p>
WCRA is involved in all facets of Amateur Radio, supporting the healthy growth
of the hobby through diversification and participation. If this sounds like a
group you'd be interested in joining, then come to one of our events or meetings and see what
kind of folks we really are.</p>

<h1>Our Mission Statement</h1>

<p style={{padding: "0.5em 2em 0.5em 2em", backgroundColor: "#F0F0F0", maxWidth: "40%", border: "1px solid black"}}>
The mission of the Wheaton Community Radio Amateurs is to further the art of
radio communications and electronics by mentoring anyone with like interests,
participating in community events, preparedness in assisting in the event of a
disaster where other communication modes can fail, while promoting social
camaraderie among its members.
</p>
</div>
<table style={{margin: "2em auto auto auto"}}>
<tbody>
<tr>
<td>
  <a href="http://www.wunderground.com/US/IL/Wheaton.html"><img alt=""
    src="http://banners.wunderground.com/banner/bigwx_both_cond/language/www/US/IL/Wheaton.gif" /></a>
</td>
<td>
  <div>Solar X-rays:
  <img alt="" src="http://www.n3kl.org/sun/images/status.gif" /></div>
  <div>Geomagnetic Field:
  <img alt="" src="http://www.n3kl.org/sun/images/kpstatus.gif" /></div>
  <div>Courtesy <a href="http://www.n3kl.org/sun/noaa.html">n3kl.org</a></div>
</td>
</tr>
</tbody>
</table>
                </div>
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