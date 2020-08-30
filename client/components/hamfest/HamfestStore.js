import React from 'react'
import Product from './Products'
import Electrical from './Electrical'
import ShoppingCart from './ShoppingCart';

const tempProd = [
    // { name: 'Advanced Tickets',
    //   dataName: 'Tickets',
    //   price: 8,
    //   onSale: false,
    //   decription: 'Entree Ticket with 4 raffle studs. Day off tickets come with only 1 stud and will be $10.'},
    {name: "Extra chair",
    dataName: 'Chairs',
      description: 'a metal folding chair. One chair is provided with each Vendor request.',
      price: 2,
      onSale: false,
      photo: '',
    id:1},
    {name: "Table",
    dataName: 'Tables',
      description: '8 foot by 4 foot folding table.',
      price: 25,
      onSale: true,
      photo: '',
      id:3},
    {name: "Electrical",
    dataName: 'Electrical',
      description: 'An Electrical drop',
      price: 15,
      onSale: false,
      photo: '',
      id:2}
  ];

class HamfestStore extends React.Component {
    constructor(){
        super()
        this.state = {
            products: tempProd
        }
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
                        {this.state.products.map(product =>{
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

export default HamfestStore