import React from 'react'

const Electrical = (props) => {
    const product = props.product
    const other =  {qty:1, total: 15}
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
                <p>
            <button className='add_to_cart' onClick={() => props.addToCartOnClick(product, event, other)} >Add to Card</button>
            </p>
            </div>
        </div>
        </div>
        <p className="discription">{product.description}</p>
    </div>

    )
}


export default Electrical