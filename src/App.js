import React, { Suspense } from 'react';
import {
  HashRouter,
  Route,
  Switch
} from 'react-router-dom';


const Register = React.lazy(()=>import('./Layout/Register'));
const Login = React.lazy(()=>import('./Layout/Login'));

const App = () => {
  return (
    <HashRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
        <Route 
            path="/register"
            exact
            name="Register"
            render={props => <Register {...props} />}
          />
          <Route 
            path="/login"
            exact
            name="Login"
            render={props => <Login {...props}/>}
          />
        </Switch>
      </Suspense>
    </HashRouter>
  );
}

export default App;
