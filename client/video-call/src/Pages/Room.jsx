import React, { useEffect, useCallback, useState } from 'react'
import {useSocket} from "../Providers/Socket";
import {usePeer} from "../Providers/Peer"
import ReactPlayer from "react-player"
import { Button, Typography } from '@mui/material';

const Room = () => {

  const { socket } = useSocket();
  const {peer, createOffer, createAnswer, setRemoteAnswer, sendStream, remoteStream} = usePeer();

  const [myStream, setMyStream] = useState(null);
  const [remoteEmail, setRemoteEmail] = useState()

  const handleNewUserJoined =  useCallback( 
      async(email) =>{
      const offer = await createOffer();
      socket.emit('call-user', { email, offer});
      setRemoteEmail(email);
    }, [createOffer, socket]
  );

  const handleIncomingCall = useCallback(
      async(data)=>{
        const {from, offer} = data;
        const answer = await createAnswer(offer);
        socket.emit('call-accepted', {email: from, answer});
        setRemoteEmail(from);
      }, [socket, createAnswer]
  )

  const handleCallAccepted = useCallback(
      async(data)=>{
        const {answer} = data;
        console.log('call got accepted ', answer);
        await setRemoteAnswer(answer);
      }, [setRemoteAnswer]
  );

  const getUserStream = useCallback(async()=>{
    const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
    
    setMyStream(stream);
  }, [sendStream])
    
  useEffect(()=> {
    socket.on('user-joined', handleNewUserJoined);
    socket.on('incoming-call', handleIncomingCall);
    socket.on('call-accepted', handleCallAccepted);
    
    return () =>{
      socket.off('user-joined', handleNewUserJoined);
      socket.off('incoming-call', handleIncomingCall);
      socket.off('call-accepted', handleCallAccepted);
    }
  }, [socket, handleNewUserJoined, handleIncomingCall, handleCallAccepted]);

  const handleNegotiation = useCallback((event)=>{
    const localOffer = peer.localDescription;
    socket.emit('call-user', {email: remoteEmail, offer: localOffer});
  },[peer.localDescription, remoteEmail, socket])

  useEffect(()=>{
    peer.addEventListener('negotiationneeded', handleNegotiation);

    return () =>{
      peer.removeEventListener('negotiationneeded', handleNegotiation);
    }
  }, [])

  useEffect(()=>{
    getUserStream();
  },[getUserStream])

  return (
    <div>
       <Typography variant='h2'>You are connected to {remoteEmail}</Typography>
       <Button variant="contained" onClick = {() => sendStream(myStream)}>Share Media/Stream</Button>
       <ReactPlayer url={myStream} playing={true}/>
       <ReactPlayer url={remoteStream} playing={true}/>
    </div>
  )
}

export default Room
