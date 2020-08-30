import React from 'react'
import Product from './Products'
import Electrical from './Electrical'
import ShoppingCart from './ShoppingCart';
import {connect} from 'react-redux'
import { fetchAllProducts } from '../../store';


const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProducts: () => dispatch(fetchAllProducts())
    }
}

class HamfestStore extends React.Component {
    

    componentDidMount(){
        this.props.getProducts()
    }

    render() {
        return(
            <>
            <div className="Subtitle" >Hamfest Store</div>
    
            <div className="Content">
            <div> 
               <form  method="POST" name="OrderForm">
                    <ShoppingCart />
                    <div className="body_container">
                        {this.props.products.map(product =>{
                            if(product.name !== Electrical) return <Product product={product} key={product.id}/>
                            else return <Electrical product={product} key={product.id}/>
                        })}
            
        


                    </div>
                </form>
            </div>
            </div>
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HamfestStore)