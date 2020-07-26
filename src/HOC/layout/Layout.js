import React, { Component } from 'react';
import Aux from '../Auxiliary'
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    
    state={
        sideDrawerOpen: false
    }

    closeSideDrawerHandler = () =>{
        this.setState({sideDrawerOpen: false})
    }

    openSideDrawerHandler = () =>{
        this.setState( ( prevState )=>{
            return {sideDrawerOpen: !prevState.sideDrawerOpen}
        } )
    }

    render(){
        return (
            <Aux>
               <SideDrawer open={this.state.sideDrawerOpen} click={this.closeSideDrawerHandler}/>
               <Toolbar click={this.openSideDrawerHandler}/>
               <main className = {classes.Content}>
                   {this.props.children}
               </main>
            </Aux>
               )
           
    }
} 
export default Layout;