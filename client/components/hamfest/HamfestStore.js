import React from 'react';
import Product from './Products';
import Electrical from './Electrical';
import ShoppingCart from './ShoppingCart';
import { connect } from 'react-redux';
import { fetchAllProducts } from '../../redux/products';
import { addProductToCart } from '../../redux/cart';

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: () => dispatch(fetchAllProducts()),
    addToCart: (item) => dispatch(addProductToCart(item)),
  };
};

class HamfestStore extends React.Component {
  constructor() {
    super();
    this.addToCartOnClick = this.addToCartOnClick.bind(this);
  }

  componentDidMount() {
    this.props.getProducts();
  }

  addToCartOnClick(item, event, other) {
    event.preventDefault();
    const newItem = { ...item, ...other };
    this.props.addToCart(newItem);
  }

  render() {
    return (
      <>
        <div className="Subtitle">Hamfest Store</div>

        <div className="Content">
          <div>
            <form className="columns">
              <ShoppingCart history={this.props.history} />
              <div className="body_container">
                {this.props.products.map((product) => {
                  if (product.name !== 'Electrical') {
                    return (
                      <Product
                        product={product}
                        key={product.id}
                        addToCartOnClick={this.addToCartOnClick}
                      />
                    );
                  } else {
                    return (
                      <Electrical
                        product={product}
                        key={product.id}
                        addToCartOnClick={this.addToCartOnClick}
                      />
                    );
                  }
                })}
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HamfestStore);
