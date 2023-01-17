import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    ul: {
        justifyContent: 'space-between',
         
    },
    pageNumber: {
        '&:not(:hover)': {
          color: 'black',
        },
        '&:hover': {
          color: 'red',
        },
      },
}));