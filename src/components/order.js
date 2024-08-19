import React, { useState,useContext } from 'react'
import DrawerAppBar from './AppBar'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
// import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles'
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import './card.css'
import cartContext from '../contex/Context';
import { RotatingLines } from 'react-loader-spinner'




const useStyles = makeStyles({
  root: {
    '& label.Mui-focused': {
     color: 'green',
      },
     '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
     },
    '& .MuiOutlinedInput-root': {
     '& fieldset': {
     borderColor: 'green',
     },
     '&:hover fieldset': {
      borderColor: 'green',
       },
     '&.Mui-focused fieldset': {
       borderColor: 'green',
     },
     },
    },
});





function Order() {

  const {cart}=useContext(cartContext)
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [phone,setPhone] = useState("")
  const [adress,setAdress] = useState("")
  const [spinner,setSpinner] = useState(false)
  const navigate = useNavigate();



  
  const submit= async()=>{
    setSpinner(true)
    
    const user={
  
      name:name,
      email:email,
      phone:Number(phone),
      adress:adress,
      items: cart
    }
    await axios.post("https://store-backend-rouge.vercel.app/api/users",user)
    .then(res=>{
      Swal.fire({
        title: "Order Placed!",
        icon: "success"
      });
      navigate('/')
      setSpinner(false)
      console.log(res)
    })
    .catch(err=>{
      Swal.fire({
        title: err.response.data.message,
        icon: 'error',
        
      })
      setSpinner(false)
      // console.log(err)
    })


  }
   
  const classes = useStyles();


  return (      
    <div>
        <DrawerAppBar/>
        <Box className="order-mob" sx={{ flexGrow: 1,marginTop:5 ,width:"50%", margin:"100px auto"}}>
        <h1 style={{color:"green", fontWeight:"700"}}>Your Details:</h1>
      <Grid container spacing={2}>
        <Grid item xs={6}>
      <TextField onChange={(e)=>setName(e.target.value)} className={classes.root} style={{width:"100%"}} id="outlined-basic" label="Name" name='name' value={name} variant="outlined" />
        </Grid>
        <Grid item xs={6}>
        <TextField  onChange={(e)=>setPhone(e.target.value)} className={classes.root} style={{width:"100%"}} id="outlined-basic" label="Phone" name='phone' value={phone} variant="outlined" />
        </Grid>
       
      </Grid>
      <Grid style={{marginTop:20}} container spacing={2}>
        <Grid item xs={6}>
      <TextField  onChange={(e)=>setAdress(e.target.value)} className={classes.root} style={{width:"100%"}} id="outlined-basic" label="Address" name='adress' value={adress} variant="outlined" />
        </Grid>
        <Grid item xs={6}>
        <TextField  onChange={(e)=>setEmail(e.target.value)} className={classes.root} style={{width:"100%"}} id="outlined-basic" label="Email" name='email' value={email} variant="outlined" />
        </Grid>
       
      </Grid>

      <Button onClick={submit} className='cart-btn3' variant="contained">Place Order
      
      {spinner?

<RotatingLines
  visible={true}
  height="22"
  width="22"
  color="white"
  strokeWidth="5"
  animationDuration="0.75"
  ariaLabel="rotating-lines-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
  :
  <></>
}
      </Button>
     
    </Box>


    </div>
  )
}

export default Order
