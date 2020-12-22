import React from 'react'
import {expect} from 'chai'
import {mount} from 'enzyme'
import { Provider } from 'react-redux';
import store from '../../store';
import * as rrd from 'react-router-dom';
import OfficerHistory from './OfficerHistory';
import OfficerYear from './OfficerYear';
import axios from 'axios';
import mockAdapter from 'axios-mock-adapter'

//Tests: 8 passing 0pending/failing
describe('Officer History', () => {
    let historyPage;
    let tableHeaders;
    let mockAxios
    before(() => {
        mockAxios = new mockAdapter(axios)
        mockAxios.onGet('/api/officerHistory').replyOnce(200, [])
        historyPage = mount(<Provider store={store}><rrd.MemoryRouter initialEntries={['/OfficerHistory']}><OfficerHistory /></rrd.MemoryRouter></Provider>)
    tableHeaders=historyPage.find('th').map(node => node.get(0).props.children)
    })
    it('has a page title of Past Officers/Executive Boards', () => {
        let header = historyPage.find('div').map(node => node.get(0).props)
        expect(header[0].className).to.equal('Title')
        expect(header[0].children).to.equal('Past Officers/Executive Boards')
    })
    it('has a column for years', () => {
        expect(tableHeaders).to.include('Years')
    })
    it('has a column for President', () => {
        expect(tableHeaders).to.include('President')
    })
    it('has a column for Vice President', () => {
        expect(tableHeaders).to.include('Vice President')
    })
    it('has a column for Secretary', () => {
        expect(tableHeaders).to.include('Secretary')
    })
    it('has a column for Treasurer', () => {
        expect(tableHeaders).to.include('Treasurer')
    })
    it('has a column for Custodian', () => {
        expect(tableHeaders).to.include('Custodian')
    })
    it('renders rows of Officer year', () => {
        expect(OfficerYear).to.have.lengthOf.greaterThan(0)
    })
})