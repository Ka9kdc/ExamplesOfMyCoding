import React from 'react'

import Order from "./Order"
import VendorInformation from './VendorInformation'



const Checkout = (props) => {
      
        return(
            <>
            <div className="Subtitle" >Hamfest Checkout</div>
    
            <div className="Content">
            <div> 
            <form action="https://www.paypal.com/us/cgi-bin/webscr" method="post" name="ofrm">
                    <input name="cmd" type="hidden" value="_ext-enter" /> <input name="redirect_cmd" type="hidden" value="_xclick" />
                   <div><Order /> <VendorInformation /></div>
                   <input name="business" type="hidden" value="hamfest@w9ccu.org" /> 
        <input name="currency_code" type="hidden" value="USD" /> 
        <input name="item_name" type="hidden" value="Shopping Cart" /> 
        <input alt="Make payments with PayPal - it's fast, free and secure!" name="submit" src="http://www.paypal.com/en_US/i/btn/x-click-but01.gif"  type="image" />
                </form>
            </div>
            </div>
            </>
        )
    }

export default Checkout
