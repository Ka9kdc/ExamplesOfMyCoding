import React from 'react';

const Product = (props) => {
    const product = props.product
    return(
    <div className="product_container">
    <div className="product"> 
        <p><img className="product_image" href={product.photo} alt={`picture of ${product.name}`}/></p>
        <div className="price">
            <p className="product_name">{product.name}</p>
            <div className="qty">
                
                <p>Price: 
                    <span>${product.price}</span>
                    {product.onSale ?  <span className="sale"> Sale</span> : '' }
                </p>
            <p>Qty: <input type="number" name={product.dataName} min="0"/>
            <button className='add_to_cart' >Add to Card</button>
            </p>
            </div>
        </div>
        </div>
        <p className="discription">{product.description}</p>
    </div>

    )
}

export default Product