import { userService } from "../services/user.service.js"

import { useState } from 'react'


export function Login(){
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
                        <label> Please enter your email</label>
            <input
                type="text"
                name="username"
                value={credentials.username}
                placeholder="Email"
                onChange={handleChange}
                required
                autoFocus
            />
                                    <label> Please enter your password</label>
            <input
                type="password"
                name="password"
                value={credentials.password}
                placeholder="Password"
                onChange={handleChange}
                required
                autoComplete="off"
            />
       
 
            <button className="submit">Login</button>
        </form>
    )
}