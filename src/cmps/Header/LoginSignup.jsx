import { useState } from 'react'
import { LoginForm } from './LoginForm.jsx'

// const { useState } = React

export function LoginSignup() {

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
