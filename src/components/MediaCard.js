import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ReactStars from 'react-stars'
import { Button } from '@mui/material';
import Chip from '@mui/material/Chip';
import cartContext from '../contex/Context';
import { useContext,useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';




export default function MediaControlCard({detail,products}) {
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const theme = useTheme();
  const {cart,setCart}= useContext(cartContext)
  const [open, setOpen]= useState(false)
  const navigate = useNavigate()



  const addToCart=()=>{
    const cartData= JSON.parse(localStorage.getItem('cart')) || []
    const index= cartData.findIndex(v=>v.id === detail.id)
    if(index !== -1){
      cartData.splice(index, 1 ,{...cartData[index], qty: cartData[index].qty+1})
    }
    else{
      cartData.push({ ...detail, qty:1 })


    }


    localStorage.setItem('cart',JSON.stringify(cartData))
    // console.log(cart)
    setCart(cartData)
    setOpen(true)
    // console.log(cart.id)


  }
  const buy=()=>{
    navigate('/order')


  }

  

  return (
    <Card sx={{  display: 'flex' }}>
<CardMedia 
className='img-media'
  component="img"
  sx={{ width: 300 , objectFit:"contain" }}
  image={detail.image}
  alt="Live from space album cover"
/>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
<Snackbar anchorOrigin={{horizontal:'right',vertical:'bottom'}} open={open} autoHideDuration={2000} onClose={()=>setOpen(false)}>
        <Alert onClose={()=>setOpen(false)} severity="success" sx={{ width: '100%' }} className='alert'>
          Product added in Cart
        </Alert>
      </Snackbar>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography className='title' component="div" variant="h5">
            {detail.title}
          </Typography>
          <Typography className="desc" variant="span" color="text.secondary" component="div">
            {detail.description}
          </Typography>
          <Typography className='price' variant="h6"  component="div" style={{marginTop:5}}>
            ${(Math.round( detail.price))}
          </Typography>
          <Chip  className='category' label={detail.category} style={{marginTop:3}} />
          <ReactStars


className='stars'    
count={5}
size={24}
value={detail.rating.rate}
color2={'#ffd700'} />


<div style={{marginTop:5}}>


<Button  size="small" color='success' className='cart-btn' onClick={()=>{addToCart()}} >
          ADD TO CART
        </Button>
<Button onClick={buy} size="small" color='success' className='buy-btn' style={{marginLeft: 5}} >
          BUY NOW
        </Button>
</div>

        </CardContent>
      </Box>
    </Card>
  );
}