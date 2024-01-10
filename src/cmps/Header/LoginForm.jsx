import { useState } from "react"
import { userService } from "../../services/user.service.js"
import { NavLink, useNavigate ,  useLocation} from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service.js'
import { login, signup } from '../../store/actions/user.actions.js'



// const { useState } = React

function getEmptyCredentials() {
    return {
        fullname: '',
        username: '',
        password: '',
    }
}

export function LoginForm({ onLogin, isSignup }) {

    const [credentials, setCredentials] = useState(getEmptyCredentials())
    const navigate = useNavigate()
    
    
    
    function handleCredentialsChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials(credentials => ({ ...credentials, [field]: value }))
    }
    
    async function onSubmit(ev) {
        ev.preventDefault()
        
        if (isSignup) {
            try {
                const user = await signup(credentials)
                console.log(user, credentials)
                showSuccessMsg(`Welcome ${user.fullname}`)
                navigate('/')
                
            }
            catch (err) {
                showErrorMsg('Cannot signup')

            }
        } else {
            try {
                const user = await login(credentials)
                console.log(user, credentials)
                showSuccessMsg(`Hi again ${user.fullname}`)
                navigate('/')
            }
            catch (err) {
                showErrorMsg('Cannot login')

            }
        }
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