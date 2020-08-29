import React from 'react'
import {Link} from 'react-router-dom'

//this page has no styling Marty had a seperate style sheet for the narbar
//plus the following inline styling
// div class="Navbar" style="background-color: #C0D0FF; text-align: center;">
{/* <table style="text-align: center; margin-left: auto; margin-right: auto */}

const pages = [
    {name: "Home", url: "/index.html"},
     {name: "News", url: "/News.html"},
     {name: "Events/Activities", url: "/Events.html"},
     {name: "Repeaters", url: "/Repeaters.html"},
     {name: "Hamfest", url: "/Hamfest.html"},
     {name: "Newsletter", url: "/Hamletter.html"},
     {name: "Training", url: "/Training.html"},
     {name: "About Us", url: "/About.html"},
     {name: "Join WCRA", url: "/membership"},
     {name: "Contact WCRA", url: "/Contacts.html"},
     {name: "References", url: "/References.html"}
 ]


const NavBar = (props) => {
    return (
        <div>
        { pages.map(page => {
                if(page.name === 'Join WCRA') {
                return  <Link to={page.url} key={page.name}>{page.name}</Link>
                } else {
                    return <a href={page.url} key={page.name}>{page.name}</a>
                }
              })
            }
        </div>
    )
}

export default NavBar;