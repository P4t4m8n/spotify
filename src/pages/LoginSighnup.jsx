import { userService } from "../services/user.service.js"

import { useState } from 'react'


export function LoginSighnup({isSignup}){
    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())

    function handleChange({ target }) {
        const { name: field, value } = target
        setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        onLogin(credentials)
        //console.log(credentials)
    }

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <input
                type="text"
                name="username"
                value={credentials.username}
                placeholder="Please enter your Email"
                onChange={handleChange}
                required
                autoFocus
            />
            <input
                type="password"
                name="password"
                value={credentials.password}
                placeholder="Password"
                onChange={handleChange}
                required
                autoComplete="off"
            />
            {isSignup && <div><input
                type="text"
                name="Nickname"
                value={credentials.fullname}
                placeholder="Your name on the site"
                onChange={handleChange}
                required
            />
                        <br/>

            <label> Date of birth</label>
            <input
                type="date"
                name="BirthDate"
                value={credentials.BirthDate}
                onChange={handleChange}
            />
            <br/>
            <label> Male</label>
            <input
                type="radio"
                name="Male"
                value={credentials.Gender}
                onChange={handleChange}
            />
             <label> Female</label>
            <input
                type="radio"
                name="Female"
                value={credentials.Gender}
                onChange={handleChange}
            />
             <label> Other</label>
            <input
                type="radio"
                name="other"
                value={credentials.Gender}
                onChange={handleChange}
            />
            <label>Dont want to say</label>
            <input
                type="radio"
                name="noAns"
                value={credentials.Gender}
                onChange={handleChange}
            />
            </div>}
            <button>{isSignup ? 'Signup' : 'Login'}</button>
        </form>
    )
}