import React, { Suspense } from 'react'
import {
  HashRouter,
  Route,
  Switch
} from 'react-router-dom'


const Register      = React.lazy(()=>import('./Pages/Register'))
const Login         = React.lazy(()=>import('./Pages/Login'))
const Homepage      = React.lazy(()=>import('./Pages/Homepage'))
const Profile       = React.lazy(()=>import('./Pages/Profile'))
const ProfileUpdate = React.lazy(()=>import('./Pages/ProfileUpdate'))
const Book          = React.lazy(()=>import('./Pages/Book'))

const Header    = React.lazy(()=>import('./Components/Header'))
const Footer    = React.lazy(()=>import('./Components/Footer'))

const App = () => {
  return (
    <HashRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="container mx-auto mb-auto">
            <Switch>
              <Route
                path="/"
                exact
                name="Homepage"
                render={ props => <Homepage {...props} /> }
              />
              <Route
                path="/register"
                exact
                name="Register"
                render={ props => <Register {...props} /> }
              />
              <Route
                path="/login"
                exact
                name="Login"
                render={ props => <Login {...props}/> }
              />
              <Route
                path="/profile/:user_id"
                exact
                name="Profile"
                render={ props => <Profile {...props}/> }
              />
              <Route
                path="/profile/:user_id/update"
                exact
                name="Profile Update"
                render={ props => <ProfileUpdate {...props}/> }
              />
              <Route
                path="/book/:user_id"
                exact
                name="Book"
                render={ props => <Book {...props}/> }
              />
            </Switch>
          </div>
          <Footer />
        </div>
      </Suspense>
    </HashRouter>
  );
}

export default App
