import React from 'react'
import Product from './Products'
import Electrical from './Electrical'
import ShoppingCart from './ShoppingCart';
import {connect} from 'react-redux'
import { fetchAllProducts, addProductToCart } from '../../store';
import Order from "./Order"
import VendorInformation from './VendorInformation'


const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProducts: () => dispatch(fetchAllProducts()),
        addToCart: (item) => dispatch(addProductToCart(item))
    }
}

class HamfestStore extends React.Component {
    constructor(){
        super()
        this.state = {
            checkingOut: false
        }
        this.addToCartOnClick = this.addToCartOnClick.bind(this)
        this.checkout = this.checkout.bind(this)
    }

    componentDidMount(){
        this.props.getProducts()
    }

    addToCartOnClick(item, event, other){
        event.preventDefault()
        const newItem = {...item, ...other}
        this.props.addToCart(newItem)
    }
    checkout(event){
        event.preventDefault()
        this.setState({checkingOut: !this.state.checkingOut})
    }

    render() {
        return(
            <>
            <div className="Subtitle" >Hamfest Store</div>
    
            <div className="Content">
            <div> 
               <form>
                   {this.state.checkingOut ? <div><Order /> <VendorInformation /></div>
                   : <div><ShoppingCart checkout={this.checkout}/>
                    <div className="body_container">
                        {this.props.products.map(product =>{
                            if(product.name !== 'Electrical') return <Product product={product} key={product.id} addToCartOnClick={this.addToCartOnClick}/>
                            else return <Electrical product={product} key={product.id} addToCartOnClick={this.addToCartOnClick}/>
                        })}
                    </div></div>}

                </form>
            </div>
            </div>
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HamfestStore)