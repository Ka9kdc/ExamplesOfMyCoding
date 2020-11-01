import React from 'react'
import {NavLink} from 'react-router-dom'

//this page has no styling Marty had a seperate style sheet for the narbar
//plus the following inline styling
// div class="Navbar" style="background-color: #C0D0FF; text-align: center;">
{/* <table style="text-align: center; margin-left: auto; margin-right: auto */}

const pages = [
    {name: "Home", url: "/index.html"},
     {name: "News", url: "/News.html"},
     {name: "Events/Activities", url: "/Events.html"},
     {name: "Repeaters", url: "/Repeaters"},
     {name: "Hamfest", url: "/hamfestStore"},
     {name: "Newsletter", url: "/Hamletter.html"},
     {name: "Training", url: "/Training.html"},
     {name: "About Us", url: "/About"},
     {name: "Join WCRA", url: "/membership"},
     {name: "Contact WCRA", url: "/ContactUs"},
     {name: "References", url: "/References"},
     {name: "Member Page", url: "/MemberPage"},
 ]


const NavBar = (props) => {
    return (
        <div className="Navbar ">
        { pages.map(page => {
                if(page.name === 'Join WCRA' || page.name === 'Hamfest' || page.name === 'Member Page') {
                return  <NavLink to={page.url} key={page.name} >{page.name}</NavLink>
                } else {
                    return <a href={page.url} key={page.name}>{page.name}</a>
                }
              })
            }
        </div>
    )
}

export default NavBar;