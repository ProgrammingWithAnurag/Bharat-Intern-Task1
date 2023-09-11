import React, {useState} from 'react'
import { Box, Typography, TextField, Button,styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../redux/store';
import toast from 'react-hot-toast'

const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
    margin-top: 50px;
`;

const Wrapper = styled(Box)`
    padding: 4px 35px;
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

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

      //state
      const [inputs,setInputs] = useState({
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
            const { data } = await axios.post("/api/v1/user/login", {
                email: inputs.email,
                password: inputs.password,
            });
            if(data.success){
                localStorage.setItem('userId', data?.user._id)
                dispatch(authActions.login());
                toast.success("User Login Successfully");
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
     } 

  return (
    <form onSubmit={handleSubmit}>
      <Component>
      <Box>
            <Typography variant="h4" padding={3} textAlign="center" color="gray">LOGIN</Typography>
            <Wrapper>
                  <TextField variant="standard" value={inputs.email} type={"email"} onChange={handleChange} name='email' label='Enter Email' />
                  <TextField variant="standard" value={inputs.password} type={"password"} onChange={handleChange} name='password' label='Enter Password' />

                  <LoginButton variant="contained" type="submit">Login</LoginButton>
                  <Text style={{ textAlign: 'center' }}>OR</Text>
                  <SignupButton  style={{ marginBottom: 50 }} onClick={() => navigate("/register")}>Create an account?</SignupButton>
            </Wrapper> 
      </Box>
  </Component>
  </form>
  )
}

export default Login;


 