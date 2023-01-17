import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';

// import actions 
import { getPosts } from '../actions/posts';
// import styles
import useStyles from './styles';

const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
    }
  }, [dispatch, page]);
// JS code
  return (
    <Pagination
      classes={{ ul: classes.ul }} //props
      count={numberOfPages}
      page={Number(page)||1}
      // variant="outlined"
      // color="primary"
      className={classes.pageNumber}
      renderItem={(item) => (//want to immediately return something hence simple parentehesis
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
      )}
    />
  );
};

export default Paginate;