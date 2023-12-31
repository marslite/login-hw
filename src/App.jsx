import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useState } from 'react'


import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignupPage/SignupPage";


import userService from "./utils/userService";
// ANY Component rendered by a ROUTE, goes in the pages folder!
// Client side routing, Just for showing or hiding components based on the address
// in the url
function App() {

  // this will the get token from localstorage and decode it when the page loads up 
  // and set it as our initial state
  // if there is a token, user will be the user object, if there is not token user will null
  const [user, setUser] = useState(userService.getUser());


  // update our state everytime someones signs up or logs in, (in handleSubmit of LoginPage and SignupPage)
  // so we want to make sure we get the most recent token being made
  function handleSignUpOrLogin(){
    setUser(userService.getUser())
  }
  return (
    <Routes>
      <Route path="/" element={<h1>Home Pageeeeeeeeeee</h1>} />
      <Route path="/login" element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin}/>} />
      <Route path="/signup" element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin}/>} />
    </Routes>
  );
}

export default App;
