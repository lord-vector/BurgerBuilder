import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../HOC/Auxiliary'

const SideDrawer = (props) =>{
    let sideDrawerClass = [classes.SideDrawer, classes.Close];
    if (props.open === true){
        sideDrawerClass = [classes.SideDrawer, classes.Open];
    }
    return(
        <Aux>
            <Backdrop show={props.open} clicked={props.click}/>
            <div className={sideDrawerClass.join(' ')}>
                <div className={classes.Logo}><Logo /></div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
}

export default SideDrawer;