import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import logo from './punchtime.png'
import requests from '../services/requests'

const Login = ({ cookies, cookieSetter }) => {
  const [usernameText, setUsername] = useState('')
  const [passwordText, setPassword] = useState('')
  const [invalidInput, setInvalidInput] = useState('')
  const [errorMessage, seterrorMessage] = useState(false)
  const navigator = useNavigate()

  const submit = async (event) => {
    event.preventDefault()
    let result
    //  if we do not add await, we will get a promise. If we add await, we will get the data
    // however, even if we get the data, the status code might still not be 200, so we need to check for that
    try {
      if (cookies.data === undefined) {
        console.log(cookies.data)
        // the first time we login, we need to set the user name and password cookies. However, for some reason, the cookies are not being set until react goes back to app.js. Hence over here we make axios request using the username and password text
        result = await requests.validateLogin(usernameText, passwordText)
      } else {
        result = await requests.validateLogin(cookies.data.email, cookies.data.password)
      }
      console.log('Promise fulfilled:', result)
      if (result.status === 200) {
        console.log(result.data.value)
        cookieSetter('data', result.data.value, { path: '/', expires: new Date(Date.now() + 50000000) })
        navigator('/time')
      }
    } catch (e) {
      console.log('Promise rejected:', e)
      console.log(e.message)
      if (e.message === 'Request failed with status code 404') {
        setInvalidInput('Your username or password or both was incorrect')
        seterrorMessage(true)
        setUsername('')
        setPassword('')
      } else if (e.message === 'Network Error') {
        // reroute to an error page saying that the server is down
        navigator('/serverdown')
      }
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return <div className='outerContainer'>
      <div className='login-form'>
          <div ><img className = 'logo' src={logo} alt='Logo'></img></div>
          <h1 className='TEXT'>   PunchTime</h1>
          <div className={`transparent-box${errorMessage ? ' error' : ''}`}>
              <p className='error-message'>{invalidInput}</p>
              <form onSubmit={submit}>
                <input id='Inputs' value={usernameText} placeholder = 'Email Address' onChange={handleUsernameChange}/><br/>
                <input id='Inputs' value={passwordText} placeholder = 'Password' onChange={handlePasswordChange}/><br/>
                <button className='loginBut' id='Inputs' type="submit">Login</button>
              </form>
          </div>
      </div>
    </div>
}

export default Login
