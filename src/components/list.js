import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";




export default function AlignItemsList({ cartData, deleteCart, updateQty }) {
  return (

    <div>


      {cartData.map((v, i) => {

        return (

          <div key={i} >

            <List sx={{ width: '100%', maxWidth: 320, bgcolor: 'background.paper' }}>
              <ListItem alignItems="flex-start" >
                <ListItemAvatar style={{ padding: 5 }}>
                  {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
                  <img style={{ width: 50, objectFit: 'contain' }} src={v.image} alt='' />
                </ListItemAvatar>
                <ListItemText
                  primary={v.title}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        ${v.price * v.qty}
                      </Typography>
                      <Typography style={{ display: "flex" }}>

                        {" — QTY:"}

                        <CiSquareMinus onClick={() => v.qty > 1 && updateQty("-", v.id)} size={20} style={{ marginRight: 2, cursor: 'pointer' }} />

                        {v.qty}


                        <CiSquarePlus onClick={() => updateQty("+", v.id)} size={20} style={{ marginLeft: 2, cursor: 'pointer' }} />

                        <MdDeleteOutline onClick={() => deleteCart(v.id)} style={{ marginLeft: 10, cursor: 'pointer' }} color='red' size={20} />

                      </Typography>
                    </React.Fragment>
                  }
                />

              </ListItem>
            </List>

          </div>
        )


      })}

    </div>
  );
}