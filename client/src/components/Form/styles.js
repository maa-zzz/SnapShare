
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      backgroundColor: '#e6c7a8',
      borderRadius: '4%',
    },
  },
  paper: {
    padding: theme.spacing(2),
    color: '#f5ae2d',
    backgroundColor: '#1d1b18',
  },
  form: {
    display: 'flex',
    backgroundColor: '#1d1b18',
    color: '#f5ae2d',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    color: '#e6c7a8',
    width: '97%',
    margin: '10px 0',
    color: '#f5ae2d',
  },
  buttonSubmit: {
    marginBottom: 10,
  },
}));