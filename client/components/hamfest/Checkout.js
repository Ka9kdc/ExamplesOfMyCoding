import React from 'react';
import Order from './Order';
import VendorInformation from './VendorInformation';

const Checkout = (props) => {
  return (
    <>
      <div className="Subtitle">Hamfest Checkout</div>

      <div className="Content">
        <div>
          <form>
            <div>
              <Order />
              <VendorInformation history={props.history} />
            </div>
            <div id="paypal-button-container"></div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Checkout;
