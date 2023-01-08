import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { BiPowerOff } from "react-icons/bi";

export default function Logout() {
    const navigate = useNavigate();
    const handleClick = async () => {
        localStorage.clear();
        navigate("/login");
    };
    return (
        <Button onClick={handleClick}>
            <BiPowerOff />
        </Button>
    );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: rgb(238,119,96);
  background: linear-gradient(90deg, rgba(238,119,96,1) 0%, rgba(207,48,48,1) 86%);
  border: none;
  cursor: pointer;
  &:hover {
    background: rgb(241,127,105);
    background: linear-gradient(90deg, rgba(241,127,105,1) 0%, rgba(207,65,65,1) 86%);
  }
  svg {
    color: #ebe7ff;
    font-size: 1.3rem;
  }
`;