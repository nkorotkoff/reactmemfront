import React,{useEffect,useState} from 'react'
import {Container, AppBar, Typography, Grow, Grid} from "@material-ui/core";
import{useDispatch} from "react-redux";
import {getPosts} from './actions/posts'
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import {BrowserRouter,Route,Switch} from "react-router-dom";
import Auth from "./components/Auth/Auth";


const App = ()=>{

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getPosts())
    },[dispatch])
    return (
        <BrowserRouter>
       <Container maxWidth={'lg'}>
         <Navbar/>
           <Switch>
               <Route path={'/'} exact component={Home}/>
               <Route path={'/auth'} exact component={Auth}/>
               </Switch>
       </Container>
        </BrowserRouter>
    )
}

export default App