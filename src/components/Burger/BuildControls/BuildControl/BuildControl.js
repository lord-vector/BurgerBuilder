import React from 'react';
import classes from './BuildControl.module.css';

const buildControl = (props) => {
    return(
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button className={classes.button} onClick={props.removal} disabled={props.disabled}>Less</button>
            <button className={classes.button} onClick={props.addingIngredients}>More</button>
        </div>
    )
}

export default buildControl;