import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import { axiosWithAuth } from "../utils/axiosWithAuth";
import axios from 'axios'


const initialLogin = {

  username:'',
  password:''


}

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [login, setLogin] = useState(initialLogin)
  const history = useHistory()

const authLogin = (e) => {

  e.preventDefault()

  axios.post('http://localhost:5000/api/login', login)
          .then(res => {

            localStorage.setItem('token', res.data.payload)
            
            history.push('/bubbles')
           
            


          })
          .catch(err => {

            console.log(err)

          })

          


}

const handleChange = (e) => {


  setLogin({

    ...login,
    [e.target.name]: e.target.value

  })


}


  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <div>
        <input onChange={handleChange} type='text' name='username' value={login.username} />
        <input onChange={handleChange} type='text' name='password' value={login.password} />
        <button onClick={authLogin}>Login</button>
      </div>
    </>
  );
};

export default Login;
