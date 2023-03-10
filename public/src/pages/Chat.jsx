import  React, { useState, useEffect, useRef } from 'react';
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { allUsersRoute, host } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import { io } from "socket.io-client";

function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const function1 = async () => {
    if(!localStorage.getItem('chat-app-user')) {
      navigate('/login');
    } else {
      setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      setIsLoaded(true);
    }
  };
  const function2 = async () => {
    if(currentUser) {
      if(currentUser.isAvatarImageSet) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
      } else{
        navigate("/setAvatar");
      }
    }
  }
  useEffect(() => {
    function1();
  }, []);

  useEffect(() => {
    if(currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    function2();
  }, [currentUser]);
  const handleChatChange = (chat) => {
     setCurrentChat(chat);
  }
  return (
    <Container>
      <div className='container'>
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
        {
         isLoaded && currentChat === undefined ? (
             <Welcome currentUser={currentUser}  />
          ) : ( 
            <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />  
          )
        }
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background: rgb(25,25,25);
  background: linear-gradient(90deg, rgba(25,25,25,1) 0%, rgba(9,9,9,1) 70%);
  .container {
    height: 85vh;
    width: 85vw;
    background: rgb(37,37,37);
    background: linear-gradient(180deg, rgba(37,37,37,1) 0%, rgba(9,9,9,1) 70%);
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen (min-width:720px) and (max-width:1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
