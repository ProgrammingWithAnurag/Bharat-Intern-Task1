import React, {useState} from 'react'
import { Box, Typography, TextField, Button,styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast'

const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
    margin-top: 50px;
`;

const Wrapper = styled(Box)`
    padding: 30px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const Register = () => {
      const navigate = useNavigate();

      //state
      const [inputs,setInputs] = useState({
            name: '',
            email: '',
            password: ''
      });

      //handle input change
      const handleChange = (e) => {
            setInputs((prevState) => ({
                 ...prevState,
                 [e.target.name]:e.target.value,
            }))
      }
     
     //form handle
     const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/v1/user/register", {
                username: inputs.name,
                email: inputs.email,
                password: inputs.password,
            });
            if(data.success){
                toast.success("User Register Successfully");
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        }
     } 

  return (
    <form onSubmit={handleSubmit}>
      <Component>
      <Box>
            <Typography variant="h4" padding={3} textAlign="center" color="gray">REGISTER</Typography>
            <Wrapper>
                  <TextField variant="standard" value={inputs.name} type={"text"} onChange={handleChange} name='name' label='Enter Userame' />
                  <TextField variant="standard" value={inputs.email} type={"email"} onChange={handleChange} name='email' label='Enter Email' />
                  <TextField variant="standard" value={inputs.password} type={"password"} onChange={handleChange} name='password' label='Enter Password' />

                  <SignupButton type="submit">Signup</SignupButton>
                  <Text style={{ textAlign: 'center' }}>OR</Text>
                  <LoginButton variant="contained" onClick={() => navigate("/login")}>Already have an account</LoginButton>
            </Wrapper>
      </Box>
  </Component>
  </form>
  )
}

export default Register;