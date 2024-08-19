import * as React from 'react';
import { Drawer } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import AlignItemsList from './list';
import { Button } from '@mui/material';
import {Alert,AlertTitle} from '@mui/material'
import { useNavigate  } from 'react-router-dom'





export default function TemporaryDrawer({open,setOpen,cartData,deleteCart,updateQty}) {

    
    
  const navigate = useNavigate()
  const explore=()=>{
    navigate('/order')

  } 
  
    return (
      <div>
        
          <React.Fragment>
            <Drawer
              anchor= 'right'
              open={open}
              onClose={()=>setOpen(false)}
              >
              

                <Box
      
      role="presentation"
      
      >
       <AlignItemsList cartData={cartData} deleteCart={deleteCart} updateQty={updateQty}/> 
     </Box>

     { cartData.length ?

       <Button onClick={explore} className='cart-btn2' variant="contained">Explore Now</Button>

      :<div style={{padding:20}}>

      <Alert severity="warning">
      <AlertTitle>Your cart is empty!</AlertTitle>
    </Alert>
      </div>
      }


      </Drawer>




          </React.Fragment>
    
      </div>
    );
  }