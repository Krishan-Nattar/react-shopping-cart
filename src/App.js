import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import data from './data';
import {ProductContext} from './contexts/ProductContext';
import { CartContext } from './contexts/CartContext';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';


function App() {
	const [products] = useState(data);
	const [cart, setCart] = useState([]);

	const addItem = item => {
		let exists = false;
		// console.log(item);
		cart.forEach(book=>{
			if(item.id===book.id){
				exists = true
			}
		})
		if(exists==false){
			setCart([...cart, item]);
		}
	};
	const removeItem = (id) =>{
		let count = 0;
		let newCart = [];
		cart.forEach((item,index)=>{
			if(item.id==id && count == 0){
				count++;
			} else {
				newCart.push(item);
			}
		setCart(newCart);
		})
	}

	return (
		<ProductContext.Provider value={{products,addItem}}>
			<CartContext.Provider value={{cart,removeItem}}>
		<div className="App">
			<Navigation cart={cart} />

			{/* Routes */}
			<Route
				exact path="/"
				component={Products}
			/>

			<Route
				path="/cart"
				render={() => <ShoppingCart cart={cart} />}
			/>
		</div>
		</CartContext.Provider>
		</ProductContext.Provider>
	);
}

export default App;
