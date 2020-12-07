import React from 'react'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import Footer from './Footer';

//Tests 4 passing
describe('footer', () => {
    let footerTextBox
    before(() => {
       let wrapper = shallow(<Footer />)
        footerTextBox = wrapper.find('div').get(0).props
    })
    it('has a class of Footer', () => {
        expect(footerTextBox.className).to.be.equal('Footer')
    })
    it('has the clubs name at the top', () => {
        expect(footerTextBox.children[0].props.children).to.be.equal('Wheaton Community Radio Amateurs')
    })
    it('has the clubs address in the middle', () => {
        expect(footerTextBox.children[1].props.children[1]).to.be.equal(' • P.O. Box 1055 • Wheaton, Illinois • 60187-1055 • (630) 923-5447 • www.w9ccu.org')
    })
    it('has a copywrite at the bottom', () => {
        expect(footerTextBox.children[2].props.children[0]).to.be.equal('Contents copyright © 2016-2021, Wheaton Community Radio Amateurs. All rights reserved.')
    })
})