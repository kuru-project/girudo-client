import React from 'react';
import { Form } from '../Components';
import {Button} from 'reactstrap';

const Login = () => {
    return (
        <>
         <div>
         <Form
				label={"Email"}
				placeholder={"Enter your email"}
				type={"email"}
				// onChange={handleEmailChange}
			/>
			<Form
				label={"Password"}
				placeholder={"Enter your password"}
				type={"password"}
				// onChange={handlePasswordChange}
			/>
			<Button
				block
				color="info"
				// onClick={handleLogin}
			>
				Login
			</Button>
			</div>
        </>
    )
}

export default Login;