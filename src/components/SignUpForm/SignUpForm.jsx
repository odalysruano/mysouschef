import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { Component } from 'react';
import { signUp } from '../../utilities/users-service';

export default class SignUpForm extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirm: '',
        error: '',
    };

    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value,
            error: ''
        });
    };

    handleSubmit = async (evt) => {
        // Prevent form from being submitted to the server
        evt.preventDefault();
        try {
            const formData = {...this.state};
            delete formData.error;
            delete formData.confirm;
            
            // The promise returned by the signUp service method
            // will resolve to the user object included in the
            // payload of the JSON Web Token (JWT)
            const user = await signUp(formData);

            this.props.setUser(user);

        }   catch {
            // An error occurred
            this.setState({ error: 'Sign Up Failed - Try Again' });
        }
    };

    render() {
        const disable = this.state.password !== this.state.confirm;
        return (
            <Container>
                <Grid container>
                    <Grid item xs={12} md={12}>
                        <TextField
                            autoComplete='off'
                            id='outlined-basic'
                            label='Name'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                            name='name'
                            value={this.state.name}
                            onChange={this.handleChange}
                            required
                        />
                        <TextField
                            autoComplete='off'
                            id='outlined-basic'
                            label='Email'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                            name='email'
                            value={this.state.email}
                            onChange={this.handleChange}
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
                            value={this.state.password}
                            onChange={this.handleChange}
                            required
                        />
                        <TextField
                            autoComplete='off'
                            id='outlined-basic'
                            label='Confirm'
                            type='password'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                            name='confirm'
                            value={this.state.confirm}
                            onChange={this.handleChange}
                            required
                        />
                        <Button variant='contained' size='large' onClick={this.handleSubmit} type="submit" disabled={disable}>SIGN UP</Button>
                        {this.state.error !== '' ?
                            <Alert severity="error" variant="outlined">{this.state.error}</Alert>
                            :
                            <></>
                        }
                    </Grid>
                </Grid>
            </Container>
        );
    }
}
