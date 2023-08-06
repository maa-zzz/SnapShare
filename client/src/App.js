import React from 'react';
import {Container} from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
// import CreatorOrTag from './components/CreatorOrTag/CreatorOrTag';

export default function App(){ 
    const user = JSON.parse(localStorage.getItem(`profile`)); //thank you redux I love you
    return(
        <BrowserRouter>
        <Container maxWidth = 'xl'>
            <Navbar />
            <Switch>
                <Route path ='/' exact component={()=><Redirect to = "/posts"/>}/>
                <Route path = '/posts' exact component={Home}/> 
                {/* for the pagination we had to render home like this */}
                <Route path="/posts/search" exact component={Home} />
                <Route path="/posts/:id" exact component={PostDetails} />
                {/* <Route path={['/creators/:name', '/tags/:name']} component={CreatorOrTag} /> */}
                <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
            </Switch>
        </Container>
        </BrowserRouter>

    )
}
//  https://colorhunt.co/palette/ffb100fbc252f0eccfa3bb98