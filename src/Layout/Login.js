import React from 'react';
import { Form } from '../Components';
import { Button } from 'reactstrap';

const Login = () => {
  return (
    <div>
      <Form label={"Email"} placeholder={"Enter your email"} type={"email"} />
      <Form label={"Password"} placeholder={"Enter your password"} type={"password"} />
      <Button block color="info">Login</Button>
    </div>
    )
}

export default Login;
