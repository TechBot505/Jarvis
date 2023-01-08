import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo2.png";

function Contacts({ contacts, currentUser, changeChat }) {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    useEffect(() => {
       if(currentUser) {
        setCurrentUserImage(currentUser.avatarImage);
        setCurrentUserName(currentUser.username);
       }
    }, [currentUser]);
    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    };
    return <>
    {
        currentUserImage && currentUserName && (
            <Container>
                <div className="brand">
                    <img src={Logo} alt="logo" />
                    <h3>Jarvis</h3>
                </div>
                <div className="contacts">
                    {
                        contacts.map((contact, index) => {
                            return (
                                <div className={`contact ${index === currentSelected ? "selected" : ""}`} key={index} onClick={()=>changeCurrentChat(index, contact)}>
                                       <div className="avatar">
                                         <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" />
                                       </div>
                                       <div className="username">
                                         <h3>{contact.username}</h3>
                                       </div>
                                </div>
                            );
                        }) 
                    }
                    <div className="current-user">
                    <div className="avatar">
                      <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" />
                    </div>
                    <div className="username">
                      <h2>{currentUserName}</h2>
                    </div>
                    </div>
                </div>
            </Container>
         ) 
    } 
    </>;
}
const Container = styled.div`
 display: grid;
 grid-template-rows: 10% 75% 15%;
 overflow: hidden;
 background: rgb(43,43,43);
 background: linear-gradient(180deg, rgba(43,43,43,1) 0%, rgba(29,29,29,1) 60%);
 .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    img {
        height: 2rem;
    }
    h3 {
        color: white;
        text-transform: uppercase;
    }
 }
.contacts {
    overflow-y: auto;
    overflow-x: hidden;
    align-items: center;
    gap: 0.8rem;
    display: flex;
    flex-direction: column;
    &::-webkit-scrollbar {
        width: 0.4rem;
        &-thumb {
            background-color: #ffffff39;
            width: 0.2rem;
            boarder-redius: 1rem;
        }
    }
        .contact {
        background: rgb(156,156,156);
        background: linear-gradient(90deg, rgba(156,156,156,1) 0%, rgba(111,111,111,1) 70%);
        min-height: 5rem;
        width: 90%;
        cursor: pointer;
        border-radius: 0.5rem;
        padding: 0.4rem;
        gap: 1rem;
        align-items: center;
        display: flex;
        transition: 0.5s ease-in-out;
        &:hover {
            background: rgb(186,186,186);
            background: linear-gradient(90deg, rgba(186,186,186,1) 0%, rgba(138,138,138,1) 70%);
        }
        .avatar {
            img {
                height: 3rem;
            }
        }
        .username {
            h3 {
                color: white;
            }
        }  
    }
    .selected {
        background: rgb(238,119,96);
        background: linear-gradient(90deg, rgba(238,119,96,1) 0%, rgba(207,48,48,1) 86%);
        box-shadow: 0 0 15px #F78259;
        &:hover {
          background: rgb(241,127,105);
          background: linear-gradient(90deg, rgba(241,127,105,1) 0%, rgba(207,65,65,1) 86%);
        }
    }
 }
 .current-user {
    background: rgb(29,29,29);
    background: linear-gradient(90deg, rgba(29,29,29,1) 0%, rgba(17,17,17,1) 70%);
    justify-content: center;
    align-items: center;
    display: flex;
    gap: 2rem;
    width: 80%;
    border-radius: 50px;
    border: 4px solid white;
    .avatar {
        img {
            height: 4rem;
            max-inline-size: 90%;
        }
    }
    .username {
        h2 {
           color: white;
        }
    }
    @media screen (min-width:720px) and (max-width:1080px) {
        gap: 0.5rem;
        .username {
            h2 {
                font-size: 1rem;
            }
        }
    }
 }
}
`;

export default Contacts;