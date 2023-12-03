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
  return (
    <div>
       <Card style={{height: '50vh', width: '50vw',padding: '3rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        <Box  style={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Typography margin={3} variant="h5">Enter Your Email:- </Typography>
        <TextField value={email} id="outlined-basic" label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value)}/>
        </Box>
        <Box margin={2} style={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Typography margin={3} variant="h5">Enter Room ID:- </Typography>
        <TextField value={room} id="outlined-basic" label="Room" variant="outlined" onChange={(e)=> setRoom(e.target.value)}/>
        </Box>
        <Button variant="contained" onClick = {handleJoinRoom}>Join Room</Button>
       </Card>
    </div>
  )
}

export default Home
