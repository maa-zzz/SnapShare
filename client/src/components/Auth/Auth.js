import React, {useState} from "react";
import {Avatar, Button, Paper, Grid, Typography, Container, TextField} from '@material-ui/core'
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from "./input"; 
import GoogleLogin from 'react-google-login';
import Icon from "./icon";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {signin, signup} from '../../actions/auth'; 


const initialState = {firstName: '', lastName: '', email: '', password: '', confirmPassword: ''}

export default function Auth(){

    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignup] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const[formData, setFormData] = useState(initialState)
    
    
    const handleSubmit = (e) =>{
        e.preventDefault(); //to prevent reload
        console.log(formData);
        if(isSignUp){
            dispatch(signup(formData, history));
        }
        else{
            dispatch(signin(formData, history));
        }
    };
    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]:e.target.value});
    };
    const handleShowPassword = ()=>{setShowPassword((prevShowPassword)=>!prevShowPassword)};

    
    const switchMode = () =>{
        setIsSignup((prevIsSignUp)=>!prevIsSignUp);
        setShowPassword(false);
    };

    const googleSuccess =  async(res) =>{
        const result = res?.profileObj//. to not throw erro
        const token = res?.tokenId;
        try{
            dispatch({type: 'AUTH', data:{result, token}});
            history.push('/');
        }
        catch(error){
            console.log(error);
        }
        // console.log(res);
    };
    const googleFailure = (error) =>{
        console.log(error);
        console.log("Google Sign In Failed. Try Again Later");
    };

    return(
        <Container component = 'main' maxWidth='xs'>
            <Paper className={classes.paper} elevation = {3}>
                <Avatar className = {classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant = "h5">{isSignUp? 'Sign Up':'Sign In'}</Typography>
                <form className = {classes.form} onSubmit={handleSubmit}>
                {/* name, ,label, handleChange, half, autoFocus, type, handleShowPassword */}
                    <Grid container spacing  = {2}>
                        {isSignUp &&(
                            <>
                            <Input name = 'firstName' label = 'First Name' handleChange={handleChange} type="text" autoFocus half/> 
                            <Input name = 'lastName' label = 'Last Name' handleChange={handleChange} type="text" half/>
                            </>
                        )}
                        <Input name = 'email' label='Email Address' handleChange={handleChange} type = 'email'/>
                        <Input name = 'password' label='Password' handleChange={handleChange} type = {setShowPassword?'text':'password'} handleShowPassword={handleShowPassword}/>
                            {isSignUp &&<Input name = "confirmPassword" label = "Confirm Password" handleChange={handleChange} type = 'password'/>}
                    </Grid>
                    <GoogleLogin
                        clientId =""
                        render = {(renderProps)=>(
                            <Button 
                            className={classes.googleButton} 
                            color="primary" 
                            fullWidth 
                            onClick={renderProps.onClick} 
                            disabled={renderProps.disabled} 
                            startIcon = {<Icon/>}
                            variant = "contained"
                            >                         
                            Google SignIn
                        </Button>
                        )}
                        onSuccess = {googleSuccess}
                        onFailure = {googleFailure}
                        cookiePolicy = "single_host_origin"
                    />
                    <Button type = "submit" fullWidth variant='contained' color='primary' className={classes.submit}>{isSignUp?'Sign Up': "Sign In"}</Button>
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>{isSignUp?'Already have an account? Sign In' : "Don't have an account? Sign Up"}</Button>
                        </Grid>

                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}