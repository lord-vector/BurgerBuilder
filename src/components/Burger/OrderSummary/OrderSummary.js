import React from 'react';
import Aux from '../../../HOC/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) =>{
    const ingredientSummary = Object.keys(props.ingredientsInit)
    .map(inKeys => {
    return <li key={inKeys}><span style={{textTransform: "capitalize"}}>{inKeys}:</span>{props.ingredientsInit[inKeys]}</li>
    })
    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delecious burger with following ingredients:</p>
            <ul>
                {ingredientSummary} 
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>  
            <Button btnType="Danger" clicked={props.cancelOrder}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continueOrder}>CONTINUE</Button> 
        </Aux>
    );
}

export default orderSummary;