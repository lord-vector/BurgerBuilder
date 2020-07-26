import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls = [
    {label: 'Cheese', value: 'cheese'},
    {label: 'Meat', value: 'meat'},
    {label: 'Salad', value: 'salad'},
    {label: 'Bacon', value: 'bacon'}
]

const buildControls = (props) =>{

    // let ResetButtonCheck = true;
    // for(let keys in props.disabled){
    //     if(props.disabled[keys] === false){
    //         ResetButtonCheck = false;
    //         break;
    //     }
    // }
    
    return(
        <div className={classes.BuildControls}>
            <p>Total Price: <strong>{props.price.toFixed(2)}</strong></p>
            <button disabled={!props.reset} className={classes.button} onClick={props.resetHandle}>Reset</button>
            {controls.map(cntrl=>{
                return <BuildControl key={cntrl.label} 
                                    label={cntrl.value} 
                                    addingIngredients={()=>props.addition(cntrl.value)}
                                    removal={()=>props.removingIngredients(cntrl.value)}
                                    disabled={props.disabled[cntrl.value]}/>
            })}
            <button className={classes.OrderButton} disabled={!props.reset} onClick={props.purchaseHandle}>ORDER NOW</button>
        </div>
    )
}

export default buildControls;