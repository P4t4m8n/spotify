import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRef, useState } from 'react';
import { userService } from '../services/user.service';
import { login, signup } from '../store/actions/user.actions';


export function SignIn() {

    const [isSignup, setIsSignUp] = useState(false)

    var credentials = useRef(userService.getEmptyCredentials())

    const defaultTheme = createTheme();

    function isLogin(ev) {
        ev.preventDefault()

        var tempObj = {
            [ev.target[0].name]: ev.target[0].value,
            [ev.target[2].name]: ev.target[2].value,
        }
        if (isSignup) {
            tempObj[ev.target[4].name] = ev.target[4].value

        }

        credentials = { ...credentials.current, ...tempObj }

        isSignup ? onSignup(credentials) : onLogin(credentials)
    }

    async function onLogin() {

        try {
            await login(credentials)
            console.log('Login')
        }
        catch (err) {
            console.log(err)
        }
    }



    async function onSignup(credentials) {
        try {
            signup(credentials)
            console.log('Signed in successfully')
        }

        catch (err) { console.log(err) }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {(isSignup) ? ' Signup' : 'Sign in'}
                    </Typography>
                    <Box component="form" onSubmit={isLogin} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="current-username"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                     
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {(isSignup) ? ' Signup' : 'Sign in'}
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" onClick={() => setIsSignUp(!isSignup)} variant="body2">
                                    {isSignup ?
                                        'Already a member? Login' :
                                        "Don't have an account? Sign Up"
                                    }
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}


