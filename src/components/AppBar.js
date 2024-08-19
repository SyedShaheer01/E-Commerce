import  React, { useContext, useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useSearchParams,useNavigate} from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import cartContext from '../contex/Context';
import TemporaryDrawer from './Drawer';


const drawerWidth = 240;
const navItems = ["ALL", "WOMEN'S CLOTHING", "MEN'S CLOTHING", "JEWELERY", "ELECTRONICS"];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  let [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen]= useState(false)
  // const [num, setNum]= React.useState(0)
  const {cart,setCart}=useContext(cartContext)
  const navigate = useNavigate()



  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
React.useEffect(()=>{
  const cartData= JSON.parse(localStorage.getItem('cart')) || [];
  
  setCart(cartData)

},[])


const deleteCart=(id)=>{
  const cartData= JSON.parse(localStorage.getItem('cart')) || [];
  const index= cartData.findIndex(v=>v.id === id)
  cartData.splice(index,1)
  localStorage.setItem('cart', JSON.stringify(cartData))
  setCart(cartData)
  // console.log(cartData)
}

const backHome=()=>{
  navigate('/')

}

const updateQty=(type,id)=>{
  const cartData = JSON.parse(localStorage.getItem('cart')) || [];
  const index= cartData.findIndex(v=>v.id === id)
  
  // console.log(type,id)

  if(type === "+"){
    cartData.splice(index, 1 ,{...cartData[index], qty: cartData[index].qty+1})

  }else{
    cartData.splice(index, 1 ,{...cartData[index], qty: cartData[index].qty-1})

  }
  localStorage.setItem('cart', JSON.stringify(cartData))
  setCart(cartData)
}
// const navigate=useNavigate()

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography  variant="h6" sx={{ my: 2,cursor:'pointer' }}>
        SUPER STORE
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem onClick={()=>{
            setSearchParams({category: item.toLocaleLowerCase()})
            navigate(`/?category=${item.toLowerCase()}`)
            }} key={item} >
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
              
        
            </ListItemButton>

            
            
          </ListItem>
        ))}
        
          
      </List>
                
 
    

    
    </Box>
  );
  
  const container = window !== undefined ? () => window().document.body : undefined;
  
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" style={{backgroundColor:'green'}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 1, display: { sm: 'none' } }}
            >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1,cursor:'pointer', display: { xs: 'none', sm: 'block' } }}
            onClick={backHome}
            >
            SUPER STORE
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
             {navItems.map((item) => (
              <Button onClick={()=>{
                // setSearchParams({category: item.toLowerCase()})
                navigate(`/?category=${item.toLowerCase()}`)
            }}
              key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))} 
          </Box>
          {/* <Box sx={{ display: { xs: 'none', sm: 'block' } }}> */}
          <Badge badgeContent={cart.length} color="error">
                
        <ShoppingCartIcon onClick={()=>setOpen(true)} style={{cursor:'pointer'}} />
        
              </Badge>

          {/* </Box> */}
          <TemporaryDrawer open={open} setOpen={setOpen} cartData={cart} deleteCart={deleteCart} updateQty={updateQty} />
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;