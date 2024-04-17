import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import * as usersService from '../../utilities/users-service';

export default function LoginForm({ setUser }) {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    function handleChange(evt) {
        setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
        setError('');
    }

    async function handleSubmit(evt) {
        // Prevent form from being submitted to the server
        evt.preventDefault();
        try {
            // The promise returned by the signUp service method 
            // will resolve to the user object included in the
            // payload of the JSON Web Token (JWT)
            const user = await usersService.login(credentials);
            setUser(user);
        }   catch {
            setError('Log In Failed - Try Again');
        }
    }

    return (
        <Container>
            <Grid container>
                <Grid item xs={12} md={12}>
                    <TextField
                        autoComplete='off'
                        id='outlined-basic'
                        label='Email'
                        variant='outlined'
                        fullWidth
                        margin='normal'
                        name='email'
                        value={credentials.email}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        autoComplete='off'
                        id='outlined-basic'
                        label='Password'
                        type='password'
                        variant='outlined'
                        fullWidth
                        margin='normal'
                        name='password'
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                    <Button variant='contained' size='large' onClick={handleSubmit} type='submit'>LOG IN</Button>
                    {error !== '' ?
                        <Alert severity="error" variant="outlined">{error}</Alert>
                        :
                        <></>
                    }
                </Grid>
            </Grid>
        </Container>
    );
}
