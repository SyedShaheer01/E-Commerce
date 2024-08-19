import React, { useContext} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import ReactStars from 'react-stars'
import './card.css'
import BasicModal from './modal';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import './cart.css'
import cartContext from '../contex/Context';



export default function MultiActionAreaCard({product, viewDetails}) {
  
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [open, setOpen]=React.useState(false)
  const {cart,setCart}= useContext(cartContext)


  const addToCart=()=>{
    const cartData= JSON.parse(localStorage.getItem('cart')) || []
    const index= cartData.findIndex(v=>v.id === product.id)
    if(index !== -1){
      cartData.splice(index, 1 ,{...cartData[index], qty: cartData[index].qty+1})
    }
    else{
      cartData.push({ ...product, qty:1 })


    }


    localStorage.setItem('cart',JSON.stringify(cartData))
    // console.log(cart)
    setCart(cartData)
    setOpen(true)
    // console.log(cart.id)


  }

  
    return (
    <Card sx={{ width: 250 ,marginTop:5}}>
      <CardActionArea>
        <div>

      <img src={product.image} style={{width: "100%" , height:220 , objectFit:'contain'}} />
        </div>
        <Snackbar anchorOrigin={{horizontal:'right',vertical:'bottom'}} open={open} autoHideDuration={2000} onClose={()=>setOpen(false)}>
        <Alert onClose={()=>setOpen(false)} severity="success" sx={{ width: '100%' }} className='alert'>
          Product added in Cart
        </Alert>
      </Snackbar>
        
        
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           $ {(Math.round(product.price))}
            
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {product.title.slice(0,10)}...

          </Typography>
 

  
          <Typography variant="span" color="text.secondary">
          {product.description.slice(0,40)}...
           
          </Typography>

        <ReactStars


        
  count={5}
  size={18}
  value={product.rating.rate}
  color2={'#ffd700'} />
        </CardContent>
 
      </CardActionArea>
      <CardActions className='cards'>
        <Button size="small" onClick={()=>{addToCart()}} color='success' className='cart-btn1'>
          ADD TO CART
        </Button>
        <Button size="small" color='success' className='buy-btn1' onClick={()=>{viewDetails(product.id)}}>
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}