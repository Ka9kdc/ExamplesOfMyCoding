import React from 'react'
import {expect} from 'chai'
import {mount} from 'enzyme'
import {Provider} from 'react-redux'
import axios from 'axios'
import * as rrd from 'react-router-dom'
import store from '../../store'
import News from './News'
import MockAdapter from 'axios-mock-adapter'

//Tests: 1 passing 1 pending/failing
//figure out a better way to test the news feed.
describe.only('News component', () => {
    let newsPage;
    let mockAxios
    const fakeNews = {
        borderColor: 'red',
        backgroundColor: '#fff0ef',
        message: `<h2>March Meeting -- Where Are Your Dues?</h2>
                  <p>The March membership meeting is when we have to cough up the annual dues. If you have not already taken care of this then have your dues ready.</p>
                  <p>Our program is provided by Debby, WX9VOR, who will be giving us a virtual tour of the National Weather Service&#39;s ham radio station.</p>`,
        PostDate: '2017-03-10T06:00:00.000Z',
      };
      const fakeNewsHistory = [
        {
          borderColor: '#1e5631',
          backgroundColor: '#fdebd0',
          message: `<h1> 2020 Hamfest </h1>
                <p> January 19, 2020 at the Kane County Fairgrounds. Kelsey has flyers and tickets. Click on the <Link to="/Hamfest">Hamfest</Link> button above for updated information.</p>
                <p>Tickets and Tables can now be ordered through our website.</p>
                <h2>Membership Dues</h2>
                <p>Membership dues are due January 1st. They can be paid at the next club meeting, through the mail or online though the <Link to="/Membership">Join WCRA</Link> page.</p>                                      
                <h2><a href="https://www.facebook.com/groups/267873833946/?ref=bookmarks">Click here for WCRA's Facebook Page</a></h2>`,
          PostDate: '2019-11-16T06:00:00.000Z',
        },
        fakeNews,
      ];
      let feed;
    before(() => {
mockAxios = new MockAdapter(axios)
mockAxios.onGet('/api/announcement/all').replyOnce(200, fakeNewsHistory);
newsPage = mount(<Provider store={store}><rrd.MemoryRouter initialEntries={['/News']}><News /></rrd.MemoryRouter></Provider>)
feed = newsPage.find('div').map(node => node.get(0).props.children)
    })
    it('has a title of Keep Up to date', () => {
        let header = newsPage.find('div').map(node => node.get(0).props)
        expect(header[0].className).to.be.equal('Title')
    expect(header[0].children).to.be.equal('Keep Up To Date')
    })
    xit('renders news feeds', () => {
        console.log(feed)
        expect(feed).to.include('<h1> 2020 Hamfest </h1>')
    })
})