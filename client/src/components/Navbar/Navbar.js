import React, { useEffect } from 'react';
import { AppBar, Button, Toolbar, Typography,Avatar } from '@material-ui/core';
import oasis from '../../images/oasis.png';
import useStyles from './styles';
import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory,useLocation } from 'react-router-dom';
import { useState } from 'react';
import decode from 'jwt-decode';


export default function Navbar(){
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();

    // console.log(user);
    const logout =()=>{
        dispatch({type:'LOGOUT'});
        history.push('/');
        setUser(null);
    }
    useEffect(()=>{
        const token = user?.token;
        //token exist then set it to that
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout(); //token expiry
          }
          //logout action if expired
        //jwt
        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location]);
// 
    return(
        <AppBar className={classes.appBar} position="static" >
        <Link to="/" className={classes.brandContainer}>
            <img className={classes.image} src={oasis} alt="icon" height="40px" />
        </Link>
        <Typography  component={Link} to = '/' className = {classes.heading} variant = 'h2' allign='center'> SnapShare</Typography>
        
        <Toolbar className={classes.toolbar}>
            {user?.result ? (
            <div className={classes.profile}>
                <Avatar className={classes.Green} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
            </div>
            ) : (
            <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
            )}
        </Toolbar>
    </AppBar>
    )
}

