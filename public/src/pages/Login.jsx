import  React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo2.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from '../utils/APIRoutes';

function Login() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        password: ""
    });
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    };

    useEffect(() => {
      if(localStorage.getItem('chat-app-user')) {
        navigate('/')
      }
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(handleValidation()) {
            const {password, username} = values;
               const { data } = await axios.post(loginRoute, {
                username,
                password
               });
               if(data.status === false) {
                toast.error(data.msg, toastOptions);
               }
               if(data.status === true) {
                localStorage.setItem("chat-app-user", JSON.stringify(data.user));
                navigate("/");
               }
        }
    };

    const handleValidation = (event) => {
        const {password, username} = values;
        if(password === "") {
            toast.error("Email and password are required.", toastOptions);
            return false;
        } else if(username.length === "") {
            toast.error("Email and password are required.", toastOptions);
            return false;
        }  
        return true;
    };

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };
  return (
  <>
    <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
            <div className="brand">
                <img src={Logo} alt="Logo" />
                <h1>Jarvis</h1>
            </div>
            <input 
              type="text" 
              placeholder='Username' 
              name="username"
              onChange={(e) => handleChange(e)} 
            />
            <input 
              type="password" 
              placeholder='Password' 
              name="password"
              onChange={(e) => handleChange(e)} 
            />
            <button type='submit'>Login</button>
            <span>
               Don't have an account ? <Link to="/register">Register</Link>
            </span>
        </form>
    </FormContainer>
    <ToastContainer />
  </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #141414;  
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
        height: 5rem;
    }
    h1{
        color: white;
        text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    backgreounf-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #CF3030;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
        border: 0.1rem solid #F1684E;
        outline: none;
    }
  }
  button {
    background: rgb(238,119,96);
    background: linear-gradient(90deg, rgba(238,119,96,1) 0%, rgba(207,48,48,1) 86%);
    color: white;
    padding: 1rem 2rem;
    cursor: pointer;
    border: none;
    font-weight: bold;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    &:hover {
      background: rgb(241,127,105);
      background: linear-gradient(90deg, rgba(241,127,105,1) 0%, rgba(207,65,65,1) 86%);
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
        color: #DF5333;
        text-decoration: none;
        font-weight: bold;
    }
  }
`;

export default Login;