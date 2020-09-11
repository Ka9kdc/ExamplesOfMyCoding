import React from 'react';


class Product extends React.Component {
    constructor(){
        super()
        this.state= {
            qty: 0,
            total: 0
        }
        this.handleChange = this.handleChange.bind(this)
    }
    
    handleChange(){
        const newtotal = this.props.product.price * event.target.value
        this.setState({qty: Number(event.target.value), total: newtotal})
    }
    
    
    render(){
    const product = this.props.product
    return(
    <div className="product_container">
    <div className="product"> 
        <p><img className="product_image" src={product.photo} alt={`picture of ${product.name}`}/></p>
        <div className="price">
            <p className="product_name">{product.name}</p>
            <div className="qty">
                
                <p>Price: 
                    <span>${product.price}</span>
                    {product.onSale ?  <span className="sale"> Sale</span> : '' }
                </p>
            <p>Qty: <input type="number" value={this.state.qty} min="0" onChange={() => this.handleChange()}/>
            <button className='add_to_cart' onClick={() => this.props.addToCartOnClick(product, event, this.state)} >Add to Card</button>
            </p>
            </div>
        </div>
        </div>
        <p className="discription">{product.description}</p>
    </div>

    )
    }
}

export default Product