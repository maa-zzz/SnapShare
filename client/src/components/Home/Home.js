import React,{useState, useEffect} from 'react';
import Form from '../Form/Form';
import Posts from '../Posts/Posts';



import { Container, Grow, Grid, Paper, AppBar, TextField, Button} from "@material-ui/core";
import { getPosts, getPostsByCreator, getPostsBySearch } from '../../actions/posts';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import Pagination from '../Pagination';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';


function useQuery(){
    return new URLSearchParams(useLocation.search);
}


export default function Home(){
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page')||1;
    const searchQuery = query.get('searchQuery');
    const classes = useStyles();
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null);
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const handleKeyPress = (e) => { //accepts event 
        if (e.keyCode === 13) {
            //search post code 13 is enter
            searchPost();
        }
      };

    const handleAddChip = (tag) => setTags([...tags, tag]);

    const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));
    
    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } 
        else {
            history.push('/');
        }
    };
    useEffect(()=>{
        dispatch(getPosts());
    }, [dispatch]);

    return (
    <Grow in>
        <Container maxWidth="xl">
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
                <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Look for posts" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
                <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
                />
                <Button 
                onClick={searchPost} 
                className={classes.searchButton} 
                variant="contained" 
                color="primary">Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />       
                        <Paper>     
                            {/* <Pagination /> */}
                            <Pagination page={page} />
                        </Paper>
                    </Grid>
                </Grid>
        </Container>
    </Grow>
    )
}