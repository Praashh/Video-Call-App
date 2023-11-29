import React from 'react'
import {TextField, Box, Typography, Card, Button} from "@mui/material";

const Home = () => {
  return (
    <div>
       <Card style={{height: '50vh', width: '50vw',padding: '3rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        <Box  style={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Typography margin={3} variant="h5">Enter Your Email:- </Typography>
        <TextField id="outlined-basic" label="Email" variant="outlined" />
        </Box>
        <Box margin={2} style={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Typography margin={3} variant="h5">Enter Room ID:- </Typography>
        <TextField id="outlined-basic" label="Room" variant="outlined" />
        </Box>
        <Button variant="contained">Join Room</Button>
       </Card>
    </div>
  )
}

export default Home
