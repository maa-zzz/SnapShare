import React from "react";
import Post from './Post/Post';
import useStyles from './styles';
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
export default function Posts({setCurrentId}){
    // const classes = useStyles();
    // const posts = useSelector((state)=>state.posts) //use selector in form, 
    const { posts, isLoading } = useSelector((state) => state.posts);
    const classes = useStyles();
    // checking posts exists or not
    if (!posts.length && !isLoading) return 'No posts';
    return(
        isLoading ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
              {posts?.map((post) => (
                //map maps the array
                <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                  <Post post={post} setCurrentId={setCurrentId} />
                </Grid>
              ))}
            </Grid>
          )
    );
}
//javascript codes from line 13 bracket