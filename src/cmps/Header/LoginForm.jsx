import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { login, signup } from '../../store/actions/user.actions.js'
import { userService } from "../../services/user.service.js"


export function LoginForm({ isSignup }) {

    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())
    const navigate = useNavigate()

    function handleCredentialsChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials(credentials => ({ ...credentials, [field]: value }))
    }

    async function onSubmit(ev) {
        ev.preventDefault()
        try {
            if (isSignup) await signup(credentials)
            else await login(credentials)
            console.log('looged in')
            navigate('/')
        }
        catch (err) { console.log(err) }
    }


    return (
        <form className="login-form" onSubmit={onSubmit}>
            <input
                type="text"
                name="username"
                value={credentials.username}
                placeholder="Username"
                onChange={handleCredentialsChange}
                required
                autoFocus
            />
            <input
                type="password"
                name="password"
                value={credentials.password}
                placeholder="Password"
                onChange={handleCredentialsChange}
                required
                autoComplete="off"
            />
            {isSignup && <input
                type="text"
                name="fullname"
                value={credentials.fullname}
                placeholder="Full name"
                onChange={handleCredentialsChange}
                required
            />}
            <button>{isSignup ? 'Signup' : 'Login'}</button>
        </form>
    )
}