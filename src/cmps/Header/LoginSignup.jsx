import { useState } from 'react'
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service.js'
//import { userService } from '../../services/user.service.js'
import { login, signup } from '../../store/actions/user.actions.js'
import { LoginForm } from './LoginForm.jsx'

// const { useState } = React

export function LoginSignup({ onSetUser }) {

    const [isSignup, setIsSignUp] = useState(false)


    return (
        <div className="login-page">
            <LoginForm isSignup={isSignup}/>
            <div className="btns">
                <button onClick={() => setIsSignUp(!isSignup)}>
                    {isSignup ?
                        'Already a member? Login' :
                        'New user? Signup here'
                    }
                </button >
            </div>
        </div >
    )
}
