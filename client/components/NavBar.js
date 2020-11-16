import React from 'react'
import {NavLink} from 'react-router-dom'

//this page has no styling Marty had a seperate style sheet for the narbar
//plus the following inline styling
// div className="Navbar" style="background-color: #C0D0FF; text-align: center;">
{/* <table style="text-align: center; margin-left: auto; margin-right: auto */}

const pages = [
    {name: "Home", url: "/"},
     {name: "News", url: "/News"},
     {name: "Events/Activities", url: "/Events"},
     {name: "Repeaters", url: "/Repeaters"},
     {name: "Hamfest", url: "/Hamfest"},
     {name: "Newsletter", url: "/Hamletter.html"},
     {name: "Training", url: "/Training"},
     {name: "About Us", url: "/About"},
     {name: "Join WCRA", url: "/Membership"},
     {name: "Contact WCRA", url: "/ContactUs"},
     {name: "References", url: "/References"},
     {name: "Member Page", url: "/MemberPage"},
     {name: 'Calendar', url: '/Calendar'},
     {name: 'Facebook', url: 'https://www.facebook.com/groups/267873833946/'}
 ]


const NavBar = (props) => {
    return (
        <div className="Navbar ">
        { pages.map(page => {
                if(page.name === 'Facebook' || page.name === 'Training' || page.name === 'Newsletter') {
                return <a href={page.url} key={page.name}>{page.name}</a>
                } else {
                    return  <NavLink to={page.url} key={page.name} >{page.name}</NavLink>
                }
              })
            }
        </div>
    )
}

export default NavBar;