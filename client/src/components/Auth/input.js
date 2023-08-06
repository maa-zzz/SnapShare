import React from "react";
import { TextField,Grid, InputAdornment, IconButton } from "@material-ui/core";
import { Visibility } from "@material-ui/icons";
import { VisibilityOff } from "@material-ui/icons";




export default function Input({name, label ,handleChange, half, autoFocus, type, handleShowPassword}){
    return(
        <Grid item xs ={12} sm = {half ? 6:12}>
            <TextField
                name = {name}
                onChange = {handleChange}
                variant = "outlined"
                required
                fullWidth
                label = {label}
                autoFocus = {autoFocus}
                type = {type}
                // className="MuiInputBase-input MuiOutlinedInput-input"
                InputProps = {name==='password'? {
                    //instead of ? can just do && and no null needed hehe
                    endAdornment:(
                        <InputAdornment position ='end'>
                            <IconButton onClick={handleShowPassword}>
                                {type==='password' ? <Visibility/> : <VisibilityOff/>}
                            </IconButton>
                        </InputAdornment>
                    ),
                }:null}
            />
        </Grid>

    )
}

