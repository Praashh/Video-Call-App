import React, { useState, useEffect, useCallback } from 'react'
import {TextField, Box, Typography, Card, Button} from "@mui/material";
import { useSocket } from '../Providers/Socket';
import {useNavigate} from "react-router-dom"

const Home = () => {
  const {socket} = useSocket();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [room, setRoom] = useState('');
  
  
  const handleRoomJoined = useCallback((roomId) =>{
    navigate(`/room/${roomId}`)
  }, [navigate]
  )

  useEffect(()=>{
    socket.on('joined-room', handleRoomJoined);

    return () =>{
      socket.off('joined-room', handleRoomJoined);
    }
  }, [socket, handleRoomJoined]);


  const handleJoinRoom = () =>{
   socket.emit('join-room', {roomId: room, email: email})
  }

  const cardStyle = {
    display: 'flex',
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  }
  return (
    <div>
       <div style={cardStyle}>
        <Box  style={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Typography margin={3} variant="h5" style={{color:'white'}}>Enter Your Email:- </Typography>
        <TextField value={email} id="outlined-basic" label="Email" variant="outlined" style={{background:'white', borderRadius:'19px'}} onChange={(e) => setEmail(e.target.value)}/>
        </Box>
        <Box margin={2} style={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Typography margin={3} variant="h5" style={{color:'white'}}>Enter Room ID:- </Typography>
        <TextField value={room} id="outlined-basic" label="Room" variant="outlined" style={{background:'white', borderRadius:'19px'}} onChange={(e)=> setRoom(e.target.value)}/>
        </Box>
        <Button variant="contained" onClick = {handleJoinRoom}>Join Room</Button>
       </div>
    </div>
  )
}

export default Home
