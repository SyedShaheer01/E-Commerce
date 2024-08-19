import * as React from 'react';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MediaControlCard from './MediaCard';
import './card.css'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
    bgcolor: 'background.paper',
  border: '2px solid green',
  boxShadow: 24,
  p: 0,
  borderRadius:20
  
  
};

export default function BasicModal({open,handleClose,detail,products}) {
  
  
  return (
    <div>
      
      <Modal 

     
    
      
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal" sx={style}>
          <MediaControlCard detail={detail} products={products} />
        
        </Box>
      </Modal>
    </div>
  );
}