import React from 'react';
import './LoginPage.css';
import { useState } from 'react';
import userService from '../../utils/userService';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useNavigate } from 'react-router-dom';



import {
	Button,
	Form,
	Grid,
	Header,
	Image,
	Message,
	Segment,
  } from "semantic-ui-react"


export default function LoginPage({handleSignUpOrLogin}){

  const [state, setState] = useState({
    email: '',
    password: '',
    passwordConf: ''
  })

  const [error, setError] = useState('');

  const navigate = useNavigate();

  function handleChange(e){
    setState({
      ...state,
      [e.target.name] : e.target.value
    })
  }

  async function handleSubmit(e){
    console.log("LOLOLOL")
    e.preventDefault();
    

    try {
      const login = await userService.login(state);
      console.log(login);
      navigate('/');
      handleSignUpOrLogin()


    } catch (err) {
      console.log(err, 'ERROR in handlesubmit LOGIN')
      setError('Check in the console!')
      
    }
  }
   

    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          <Image src='/logo.png' /> Log-in to your account
        </Header>
        <Form size='large' onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' name="email" value={state.email} onChange={handleChange} required />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              name="password"
              value={state.password}
              onChange={handleChange}
              type='password'
            />
  
            <Button color='teal' fluid size='large'>
              Login
            </Button>
          </Segment>
          {error ? <ErrorMessage error={error} /> : null}
        </Form>
        <Message>
          New to us? <a href='/signup'>Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
      
      );
}

