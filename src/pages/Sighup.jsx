import { userService } from "../services/user.service.js"

import { useState } from 'react'


export function Sighup(){
    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())
    const [selectedOption, setselectedOption] = useState('')


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
            <div>
                <label> Please enter your name</label><input
                type="text"
                name="Nickname"
                value={credentials.fullname}
                placeholder="Name"
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
            <div className="gender">
            <label> Male</label>
            <input
                type="radio"
                name="Male"
                value={credentials.Gender}
                chacked={selectedOption === 'Male'}
                onChange={handleChange}
            />
             <label> Female</label>
            <input
                type="radio"
                name="Female"
                value={credentials.Gender}
                chacked={selectedOption === 'Female'}
                onChange={handleChange}
            />
             <label> Other</label>
            <input
                type="radio"
                name="other"
                value={credentials.Gender}
                chacked={selectedOption === 'Other'}
                onChange={handleChange}
            />
            </div>
            </div>
            <button className="submit">Signup</button>
        </form>
    )
}