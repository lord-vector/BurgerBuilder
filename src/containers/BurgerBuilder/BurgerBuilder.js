import React, { Component } from 'react';
import Aux from '../../HOC/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary  from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'

const INGREDIENTSPRICE = {
    cheese: 0.6,
    meat: 1.3,
    salad: 0.8,
    bacon: 0.9
}

class BurgerBuilder extends Component{
    
    state = {
        ingredients:{
            cheese: 0,
            meat: 0,
            salad: 0,
            bacon: 0,
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        spinner: false
    }

    updatePurchasable = (updatePurchase)=>{
        const adding = Object.keys(updatePurchase).map(
            inKeys => updatePurchase[inKeys]
        ).reduce((sum, nxt)=> sum+nxt)

        this.setState({
            purchasable: adding > 0
        })
    }

    addIngredientsHandler = (type) => {
        const oldValue = this.state.ingredients[type];
        const newValue = oldValue + 1;
        const ingredientsValue = {...this.state.ingredients};
        ingredientsValue[type] = newValue;
        const newPrice = this.state.totalPrice + INGREDIENTSPRICE[type]
        this.setState({
            ingredients: ingredientsValue,
            totalPrice: newPrice
        })
        this.updatePurchasable(ingredientsValue);
    }

    removeIngredientsHandler = (type)=>{
        const oldValue = this.state.ingredients[type];
        if(oldValue <= 0){
            return;
        }
        const newValue = oldValue - 1;
        const ingredientsValue = {...this.state.ingredients};
        ingredientsValue[type] = newValue;
        const newPrice = this.state.totalPrice - INGREDIENTSPRICE[type];
        this.setState({
            ingredients: ingredientsValue,
            totalPrice: newPrice
        })
        this.updatePurchasable(ingredientsValue);
    }

    resetHandler = ()=>{
        this.setState({ingredients:{
            cheese: 0,
            meat: 0,
            salad: 0,
            bacon: 0,
        },
        totalPrice: 4,
        purchasable: false})
        this.updatePurchasable(this.state.ingredients);
    }

    purchaseHandler = ()=>{
        this.setState({purchasing: true})
    }
    
    cancelOrderHandler = () =>{
        this.setState({purchasing: false})
    }

    continueOrderHandler = () =>{
        //alert('You Continue')
        this.setState({spinner: true})
        const orderDetails = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Anuj',
                address: {
                    street: 'Arya Nagar',
                    zip: '491001',
                    country: 'India'},
                email: 'test@test.com'
            },
            delivery: 'fast'
        }
        axios.post('/orders.json', orderDetails).then(response=>{
            this.setState({spinner: false, purchasing: false})
        }).catch(error =>{
           this.setState({spinner: false, purchasing: false})
        })
    }

    render(){
        const disableProperty = {
            ...this.state.ingredients
        }
        for(let key in disableProperty){
            disableProperty[key] = disableProperty[key] <= 0;
        }

        let orderSummary =  <OrderSummary ingredientsInit={this.state.ingredients} 
        price={this.state.totalPrice}
        cancelOrder={this.cancelOrderHandler}
        continueOrder={this.continueOrderHandler}/>;
        if (this.state.spinner){
            orderSummary = <Spinner />
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} backdropHandle={this.cancelOrderHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls addition={this.addIngredientsHandler}
                                removingIngredients={this.removeIngredientsHandler}
                                disabled={disableProperty}
                                price={this.state.totalPrice}
                                reset={this.state.purchasable} 
                                resetHandle={this.resetHandler}
                                purchaseHandle={this.purchaseHandler}/>
            </Aux>
        )
    }
}

export default BurgerBuilder;