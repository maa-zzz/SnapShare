import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: '1d1b18',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: "#e6c7a8",
    backgroundColor: '#1d1b18',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
    transition: 'transform 0.3s', // Add a smooth transition effect for the raised effect
    '&:hover': {
      transform: 'scale(1.07)', // Move the card up by 5px on hover
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add a box shadow on hover
    },
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: '#e6c7a8',
  },
  grid: {
    display: 'flex',
    color: '#',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
    color: '#e6c7a8',
    
  },
  title: {
    padding: '0 16px',
    color: '#f5ae2d',
    
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardAction: {
    display: 'block',
    textAlign: 'initial',
  },
});
